import React, { useEffect, useState } from 'react';
import { Input, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@nathanpass/ui';
import { toast } from 'sonner';
import { api } from '@/services/api';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      try {
        const data = await api.get('/crm/clients');
        setClients(data);
      } catch (err) {
        toast.error('Erro ao carregar clientes');
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editing) {
        const updated = await api.put(`/crm/clients/${editing.id}`, form);
        setClients((prev) => prev.map((c) => c.id === updated.id ? updated : c));
        toast.success('Cliente atualizado!');
        setEditing(null);
      } else {
        const created = await api.post('/crm/clients', form);
        setClients((prev) => [...prev, created]);
        toast.success('Cliente cadastrado!');
      }
      setForm({ name: '', email: '', phone: '', notes: '' });
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar cliente');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      await api.delete(`/crm/clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
      toast.success('Cliente excluído!');
    } catch (err) {
      toast.error('Erro ao excluir cliente');
    }
  }

  function handleEdit(client) {
    setEditing(client);
    setForm({ name: client.name, email: client.email, phone: client.phone, notes: client.notes || '' });
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Gestão de Clientes</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <Input placeholder="Nome" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <Input placeholder="E-mail" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <Input placeholder="Telefone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
        <Input placeholder="Observações" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
        <Button type="submit">{editing ? 'Salvar' : 'Cadastrar'}</Button>
        {editing && <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm({ name: '', email: '', phone: '', notes: '' }); }}>Cancelar</Button>}
      </form>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Lista de Clientes</h2>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Observações</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.notes}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(client)}>Editar</Button>{' '}
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(client.id)}>Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
} 