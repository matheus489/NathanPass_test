import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Table, TableHead, TableRow, TableCell, TableBody } from '@nathanpass/ui';
import { toast } from 'sonner';
import { api } from '@/services/api';

const TRANSACTION_TYPES = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
];

export default function FinancialPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: 'income', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const companyId = 1; // Ajuste para multiempresa se necessário
        const data = await api.get(`/financial/transactions/${companyId}`);
        setTransactions(data);
      } catch (err) {
        toast.error('Erro ao carregar lançamentos');
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, amount: parseFloat(form.amount), companyId: 1 };
      const created = await api.post('/financial/transactions', payload);
      setTransactions((prev) => [created, ...prev]);
      toast.success('Lançamento registrado!');
      setForm({ type: 'income', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
    } catch (err) {
      toast.error(err.message || 'Erro ao registrar lançamento');
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Gestão Financeira</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required>
          {TRANSACTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </Select>
        <Input placeholder="Categoria" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required />
        <Input placeholder="Valor" type="number" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required />
        <Input placeholder="Descrição" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
        <Button type="submit">Registrar</Button>
      </form>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Lançamentos</h2>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{new Date(t.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{t.type === 'income' ? 'Receita' : 'Despesa'}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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