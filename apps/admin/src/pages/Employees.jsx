import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../services/api';

const validationSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos')
    .required('CPF é obrigatório'),
  phone: yup
    .string()
    .matches(/^\d{11}$/, 'Telefone deve conter 11 dígitos')
    .required('Telefone é obrigatório'),
  role: yup.string().required('Cargo é obrigatório'),
  salary: yup
    .number()
    .min(0, 'Salário deve ser maior ou igual a 0')
    .required('Salário é obrigatório'),
});

const roles = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'MANAGER', label: 'Gerente' },
  { value: 'CASHIER', label: 'Caixa' },
  { value: 'SUPPORT', label: 'Suporte' },
];

function Employees() {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'phone', headerName: 'Telefone', width: 150 },
    {
      field: 'role',
      headerName: 'Cargo',
      width: 150,
      valueGetter: (params) =>
        roles.find((role) => role.value === params.row.role)?.label || params.row.role,
    },
    {
      field: 'salary',
      headerName: 'Salário',
      width: 150,
      valueGetter: (params) =>
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(params.row.salary),
    },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'createdAt',
      headerName: 'Data de Cadastro',
      width: 180,
      valueGetter: (params) =>
        new Date(params.row.createdAt).toLocaleDateString('pt-BR'),
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      role: '',
      salary: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post('/employees', values);
        setEmployees([...employees, response.data]);
        handleClose();
        formik.resetForm();
      } catch (error) {
        console.error('Erro ao criar funcionário:', error);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchEmployees();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Funcionários</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Novo Funcionário
        </Button>
      </Box>

      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
        autoHeight
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo Funcionário</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              error={formik.touched.cpf && Boolean(formik.errors.cpf)}
              helperText={formik.touched.cpf && formik.errors.cpf}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Telefone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              id="role"
              label="Cargo"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="salary"
              label="Salário"
              name="salary"
              type="number"
              value={formik.values.salary}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Employees; 