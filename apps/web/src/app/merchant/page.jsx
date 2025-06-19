"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@nathanpass/ui";
import { Building, Users, CreditCard, Settings, BarChart2, UserPlus, FileText, TrendingUp, TrendingDown, AlertTriangle, User, Trash2 } from "lucide-react";
import { toast } from "sonner";
import SupportChatbot from "@/components/SupportChatbot";
import { api } from "@/services/api";

export default function MerchantPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    {
      label: "Total de Vendas",
      value: "R$ 12.345,67",
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      change: "+20.1% em relação ao mês anterior",
      color: "from-green-400 to-green-600",
    },
    {
      label: "Funcionários Ativos",
      value: "24",
      icon: <Users className="h-6 w-6 text-primary" />,
      change: "+2 novos este mês",
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Transações Hoje",
      value: "156",
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      change: "+12% em relação a ontem",
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Ticket Médio",
      value: "R$ 79,14",
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      change: "+5% em relação ao mês anterior",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  const mockChart = [120, 90, 150, 80, 200, 170, 140];
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const activities = [
    { id: 1, text: "Venda realizada: R$ 250,00", date: "Hoje, 10:32" },
    { id: 2, text: "Novo funcionário cadastrado: Ana Souza", date: "Ontem, 16:20" },
    { id: 3, text: "Transação reembolsada: R$ 120,00", date: "Ontem, 14:10" },
    { id: 4, text: "Venda realizada: R$ 1.200,00", date: "2 dias atrás, 11:05" },
  ];

  // Mock funcionários
  const employees = [
    { id: 1, name: "Ana Souza", role: "Gerente", status: "Ativo", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Carlos Lima", role: "Vendas", status: "Ativo", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Marina Silva", role: "RH", status: "Férias", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 4, name: "Pedro Santos", role: "Financeiro", status: "Ativo", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  ];

  // Mock transações
  const transactions = [
    { id: 1, date: "2024-06-18", value: 250, type: "Venda", status: "Concluída" },
    { id: 2, date: "2024-06-17", value: 120, type: "Reembolso", status: "Reembolsada" },
    { id: 3, date: "2024-06-16", value: 800, type: "Venda", status: "Concluída" },
    { id: 4, date: "2024-06-15", value: 90, type: "Venda", status: "Pendente" },
  ];

  // Mock lançamentos financeiros
  const [financeEntries, setFinanceEntries] = useState([
    { id: 1, type: "entrada", description: "Venda balcão", value: 500, date: "2024-06-18" },
    { id: 2, type: "saida", description: "Compra de insumos", value: 200, date: "2024-06-17" },
    { id: 3, type: "entrada", description: "Pix recebido", value: 300, date: "2024-06-16" },
  ]);
  const [newEntry, setNewEntry] = useState({ type: "entrada", description: "", value: "", date: "" });

  // Calcular saldo
  const saldo = financeEntries.reduce((acc, entry) => entry.type === "entrada" ? acc + Number(entry.value) : acc - Number(entry.value), 0);

  // Adicionar lançamento
  function handleAddEntry(e) {
    e.preventDefault();
    if (!newEntry.description || !newEntry.value || !newEntry.date) return;
    setFinanceEntries([
      ...financeEntries,
      { ...newEntry, id: Date.now(), value: Number(newEntry.value) }
    ]);
    setNewEntry({ type: "entrada", description: "", value: "", date: "" });
  }

  // Mock clientes
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientError, setClientError] = useState("");
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "" });
  const [clientLoading, setClientLoading] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      setClientsLoading(true);
      try {
        const data = await api.get("/crm/clients");
        setClients(data);
      } catch (err) {
        setClientError("Erro ao carregar clientes");
      } finally {
        setClientsLoading(false);
      }
    }
    fetchClients();
  }, []);

  function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
  function validatePhone(phone) {
    return /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/.test(phone);
  }

  async function handleAddClient(e) {
    e.preventDefault();
    setClientError("");
    if (!newClient.name || !newClient.email || !newClient.phone) {
      setClientError("Preencha todos os campos.");
      return;
    }
    if (!validateEmail(newClient.email)) {
      setClientError("E-mail inválido.");
      return;
    }
    if (!validatePhone(newClient.phone)) {
      setClientError("Telefone inválido. Use o formato (11) 99999-9999");
      return;
    }
    if (clients.some(c => c.email === newClient.email)) {
      setClientError("Já existe um cliente com este e-mail.");
      return;
    }
    setClientLoading(true);
    try {
      const created = await api.post("/crm/clients", newClient);
      setClients((prev) => [...prev, created]);
      setNewClient({ name: "", email: "", phone: "" });
      toast.success("Cliente cadastrado com sucesso!");
    } catch (err) {
      setClientError("Erro ao cadastrar cliente");
    } finally {
      setClientLoading(false);
    }
  }

  async function handleRemoveClient(id) {
    try {
      await api.delete(`/crm/clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
      toast.success("Cliente removido!");
    } catch (err) {
      toast.error("Erro ao remover cliente");
    }
  }

  const tabList = [
    { key: "overview", label: "Visão Geral", icon: <Building className="w-5 h-5" /> },
    { key: "finance", label: "Financeiro", icon: <CreditCard className="w-5 h-5" /> },
    { key: "clients", label: "Clientes", icon: <User className="w-5 h-5" /> },
    { key: "employees", label: "Funcionários", icon: <Users className="w-5 h-5" /> },
    { key: "transactions", label: "Transações", icon: <FileText className="w-5 h-5" /> },
    { key: "settings", label: "Configurações", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center">
      <div className="container max-w-6xl mx-auto py-12 px-4 space-y-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-lg mb-1">
              Painel do Parceiro
            </h1>
            <p className="text-muted-foreground text-lg">
              Gerencie sua empresa e visualize suas transações
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md">Configurações</Button>
        </div>

        {/* Tabs customizadas */}
        <div className="flex gap-8 bg-slate-100 rounded-xl p-4 w-fit mx-auto my-6">
          {tabList.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium text-base
                ${activeTab === tab.key ? "bg-white shadow text-blue-600" : "text-slate-600 hover:bg-slate-200"}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <div className="space-y-12">
              {/* Cards de indicadores */}
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <Card key={i} className={`rounded-2xl shadow-lg bg-gradient-to-br ${stat.color} text-white flex flex-col items-start justify-between p-6`}>
                    <div className="flex items-center gap-3 mb-2">
                      {stat.icon}
                      <span className="text-lg font-semibold">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-extrabold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.change}</div>
                  </Card>
                ))}
              </div>
              {/* Gráfico de barras mock */}
              <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-lg">Vendas da Semana</span>
                </div>
                <div className="flex items-end gap-4 h-40 w-full justify-center">
                  {mockChart.map((value, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className="w-8 rounded-t-lg bg-gradient-to-t from-primary to-primary/60"
                        style={{ height: `${value / 2}px` }}
                      ></div>
                      <span className="text-xs mt-2 text-muted-foreground">{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Atividades recentes */}
              <Card className="rounded-2xl shadow-lg bg-white/90">
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Últimas transações e atividades da sua empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {activities.map((activity) => (
                      <li key={activity.id} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                        <span className="flex-1">{activity.text}</span>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Gestão Financeira</h2>
                  <p className="text-muted-foreground">Controle de lançamentos e fluxo de caixa</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-bold ${saldo < 0 ? "text-red-600" : "text-green-600"}`}>Saldo: R$ {saldo.toFixed(2)}</span>
                  {saldo < 0 && (
                    <span className="flex items-center gap-1 text-red-600 font-semibold"><AlertTriangle className="w-5 h-5" /> Saldo Negativo</span>
                  )}
                </div>
              </div>
              {/* Formulário de lançamento */}
              <form onSubmit={handleAddEntry} className="flex flex-col md:flex-row gap-4 items-end bg-white/90 rounded-xl shadow p-6">
                <select
                  value={newEntry.type}
                  onChange={e => setNewEntry({ ...newEntry, type: e.target.value })}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
                <Input
                  placeholder="Descrição"
                  value={newEntry.description}
                  onChange={e => setNewEntry({ ...newEntry, description: e.target.value })}
                  className="w-full md:w-60"
                />
                <Input
                  type="number"
                  placeholder="Valor"
                  value={newEntry.value}
                  onChange={e => setNewEntry({ ...newEntry, value: e.target.value })}
                  className="w-full md:w-32"
                  min="0"
                  step="0.01"
                />
                <Input
                  type="date"
                  value={newEntry.date}
                  onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full md:w-44"
                />
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80">Lançar</Button>
              </form>
              {/* Lista de lançamentos */}
              <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/90">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="px-6 py-3 text-left font-semibold">Data</th>
                      <th className="px-6 py-3 text-left font-semibold">Tipo</th>
                      <th className="px-6 py-3 text-left font-semibold">Descrição</th>
                      <th className="px-6 py-3 text-left font-semibold">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financeEntries.map(entry => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4">{entry.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1
                            ${entry.type === "entrada" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                          `}>
                            {entry.type === "entrada" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">{entry.description}</td>
                        <td className={`px-6 py-4 font-semibold ${entry.type === "entrada" ? "text-green-600" : "text-red-600"}`}>R$ {Number(entry.value).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "clients" && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Clientes</h2>
                  <p className="text-muted-foreground">Cadastre e gerencie seus clientes</p>
                </div>
              </div>
              {/* Formulário de cadastro de cliente */}
              <form onSubmit={handleAddClient} className="flex flex-col md:flex-row gap-4 items-end bg-white/90 rounded-xl shadow p-6">
                <div className="flex flex-col gap-1 w-full md:w-60">
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    placeholder="Nome"
                    value={newClient.name}
                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full md:w-60">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={newClient.email}
                    onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full md:w-44">
                  <label className="text-sm font-medium">Telefone</label>
                  <Input
                    placeholder="Telefone"
                    value={newClient.phone}
                    onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80" disabled={clientLoading || !newClient.name || !newClient.email || !newClient.phone}>Cadastrar</Button>
              </form>
              {clientError && <div className="text-red-600 text-sm mt-2">{clientError}</div>}
              {clientLoading && <div className="text-primary text-sm mt-2">Cadastrando cliente...</div>}
              {/* Lista de clientes */}
              <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/90">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="px-6 py-3 text-left font-semibold">Nome</th>
                      <th className="px-6 py-3 text-left font-semibold">E-mail</th>
                      <th className="px-6 py-3 text-left font-semibold">Telefone</th>
                      <th className="px-6 py-3 text-left font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map(client => (
                      <tr key={client.id}>
                        <td className="px-6 py-4">{client.name}</td>
                        <td className="px-6 py-4">{client.email}</td>
                        <td className="px-6 py-4">{client.phone}</td>
                        <td className="px-6 py-4">
                          <Button variant="destructive" size="icon" onClick={() => handleRemoveClient(client.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="space-y-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Funcionários</h2>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <UserPlus className="w-4 h-4" /> Adicionar Funcionário
                </Button>
              </div>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {employees.map(emp => (
                  <Card key={emp.id} className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-white/90">
                    <img src={emp.avatar} alt={emp.name} className="w-16 h-16 rounded-full mb-3 border-2 border-primary object-cover" />
                    <div className="text-lg font-semibold mb-1">{emp.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">{emp.role}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${emp.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{emp.status}</span>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="space-y-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Transações</h2>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <FileText className="w-4 h-4" /> Exportar
                </Button>
              </div>
              <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/90">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="px-6 py-3 text-left font-semibold">Data</th>
                      <th className="px-6 py-3 text-left font-semibold">Valor</th>
                      <th className="px-6 py-3 text-left font-semibold">Tipo</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="px-6 py-4">{tx.date}</td>
                        <td className="px-6 py-4">R$ {tx.value.toFixed(2)}</td>
                        <td className="px-6 py-4">{tx.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${tx.status === "Concluída" ? "bg-green-100 text-green-700" : tx.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{tx.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold mb-4">Configurações</h2>
              <Card className="rounded-2xl shadow-lg bg-white/90 max-w-xl mx-auto">
                <CardHeader>
                  <CardTitle>Dados da Empresa</CardTitle>
                  <CardDescription>Atualize as informações da sua empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome da Empresa</label>
                      <Input type="text" defaultValue="Empresa Exemplo Ltda." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">E-mail</label>
                      <Input type="email" defaultValue="contato@empresa.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Preferências</label>
                      <select className="w-full border rounded-lg px-3 py-2">
                        <option>Receber notificações</option>
                        <option>Não receber notificações</option>
                      </select>
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">Salvar Alterações</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <SupportChatbot />
    </div>
  );
} 