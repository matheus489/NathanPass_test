"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "@nathanpass/ui";
import { Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";

export function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      try {
        const data = await api.get("/crm/clients");
        setClients(data);
      } catch (err) {
        setError("Erro ao carregar clientes");
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleDelete = async (clientId) => {
    try {
      await api.delete(`/crm/clients/${clientId}`);
      setClients((prev) => prev.filter((c) => c.id !== clientId));
      toast.success("Cliente excluído com sucesso!");
    } catch (err) {
      toast.error("Erro ao excluir cliente");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const clientData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      notes: form.notes.value,
    };
    try {
      if (selectedClient) {
        const updated = await api.put(`/crm/clients/${selectedClient.id}`, clientData);
        setClients((prev) => prev.map((c) => c.id === updated.id ? updated : c));
        toast.success("Cliente atualizado com sucesso!");
      } else {
        const created = await api.post("/crm/clients", clientData);
        setClients((prev) => [...prev, created]);
        toast.success("Cliente adicionado com sucesso!");
      }
      setIsDialogOpen(false);
      setSelectedClient(null);
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        const primeiroErro = err.errors[0];
        const campo = primeiroErro.path ? primeiroErro.path.join('.') : 'Campo';
        const minimo = primeiroErro.minimum;
        toast.error(`${campo} deve ter pelo menos ${minimo} caracteres`);
      } else {
        toast.error(err.message || "Erro ao salvar cliente");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-muted-foreground">Carregando clientes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Clientes</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedClient ? "Editar Cliente" : "Novo Cliente"}
              </DialogTitle>
              <DialogDescription>
                {selectedClient
                  ? "Atualize as informações do cliente"
                  : "Adicione um novo cliente ao sistema"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  defaultValue={selectedClient?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={selectedClient?.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  defaultValue={selectedClient?.phone}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  defaultValue={selectedClient?.notes}
                  rows={3}
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  {selectedClient ? "Salvar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {client.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {client.phone}
                  </div>
                </TableCell>
                <TableCell>{client.notes}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(client)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(client.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {clients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Nenhum cliente cadastrado.
          </p>
        </div>
      )}
    </div>
  );
} 