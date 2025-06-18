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
  cnpj: yup
    .string()
    .matches(/^\d{14}$/, 'CNPJ deve conter 14 dígitos')
    .required('CNPJ é obrigatório'),
  phone: yup
    .string()
    .matches(/^\d{11}$/, 'Telefone deve conter 11 dígitos')
    .required('Telefone é obrigatório'),
  commission: yup
    .number()
    .min(0, 'Comissão deve ser maior ou igual a 0')
    .max(100, 'Comissão deve ser menor ou igual a 100')
    .required('Comissão é obrigatória'),
});

function Partners() {
  const [open, setOpen] = useState(false);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'cnpj', headerName: 'CNPJ', width: 150 },
    { field: 'phone', headerName: 'Telefone', width: 150 },
    {
      field: 'commission',
      headerName: 'Comissão',
      width: 130,
      valueGetter: (params) => `${params.row.commission}%`,
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
      cnpj: '',
      phone: '',
      commission: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post('/partners', values);
        setPartners([...partners, response.data]);
        handleClose();
        formik.resetForm();
      } catch (error) {
        console.error('Erro ao criar parceiro:', error);
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

  const fetchPartners = async () => {
    try {
      const response = await api.get('/partners');
      setPartners(response.data);
    } catch (error) {
      console.error('Erro ao carregar parceiros:', error);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchPartners();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Parceiros</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Novo Parceiro
        </Button>
      </Box>

      <DataGrid
        rows={partners}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
        autoHeight
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo Parceiro</DialogTitle>
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
              id="cnpj"
              label="CNPJ"
              name="cnpj"
              value={formik.values.cnpj}
              onChange={formik.handleChange}
              error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
              helperText={formik.touched.cnpj && formik.errors.cnpj}
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
              id="commission"
              label="Comissão (%)"
              name="commission"
              type="number"
              value={formik.values.commission}
              onChange={formik.handleChange}
              error={formik.touched.commission && Boolean(formik.errors.commission)}
              helperText={formik.touched.commission && formik.errors.commission}
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

export default Partners; 