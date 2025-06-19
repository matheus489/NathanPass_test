"use client";

import { useState } from "react";
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

export function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Simular carregamento de dados
  useState(() => {
    const mockClients = [
      {
        id: 1,
        name: "João Silva",
        email: "joao.silva@email.com",
        phone: "(11) 99999-9999",
        notes: "Cliente desde 2023",
      },
      {
        id: 2,
        name: "Maria Santos",
        email: "maria.santos@email.com",
        phone: "(11) 98888-8888",
        notes: "Cliente VIP",
      },
      {
        id: 3,
        name: "Pedro Oliveira",
        email: "pedro.oliveira@email.com",
        phone: "(11) 97777-7777",
        notes: "Cliente novo",
      },
    ];

    setTimeout(() => {
      setClients(mockClients);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleDelete = async (clientId) => {
    try {
      // TODO: Implementar exclusão real
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== clientId)
      );
      toast.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implementar salvamento real
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (selectedClient) {
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === selectedClient.id ? selectedClient : client
          )
        );
        toast.success("Cliente atualizado com sucesso!");
      } else {
        const newClient = {
          id: clients.length + 1,
          name: e.target.name.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
          notes: e.target.notes.value,
        };
        setClients((prevClients) => [...prevClients, newClient]);
        toast.success("Cliente adicionado com sucesso!");
      }
      setIsDialogOpen(false);
      setSelectedClient(null);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      toast.error("Erro ao salvar cliente");
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