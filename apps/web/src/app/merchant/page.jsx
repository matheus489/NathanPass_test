"use client";

import { useState } from "react";
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
import { Building, Users, CreditCard, Settings, BarChart2, UserPlus, FileText } from "lucide-react";

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

  const tabList = [
    { key: "overview", label: "Visão Geral", icon: <Building className="w-5 h-5" /> },
    { key: "employees", label: "Funcionários", icon: <Users className="w-5 h-5" /> },
    { key: "transactions", label: "Transações", icon: <CreditCard className="w-5 h-5" /> },
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
    </div>
  );
} 