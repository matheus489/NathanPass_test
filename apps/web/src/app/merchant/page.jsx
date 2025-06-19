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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nathanpass/ui";
import { Building, Users, CreditCard, Settings } from "lucide-react";

export default function MerchantPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-primary/5 p-1 rounded-lg flex gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building className="w-5 h-5" /> Visão Geral
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-5 h-5" /> Funcionários
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-5 h-5" /> Transações
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-5 h-5" /> Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="rounded-2xl shadow-lg bg-white/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                  <CreditCard className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 12.345,67</div>
                  <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-lg bg-white/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
                  <Users className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 novos este mês</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-lg bg-white/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transações Hoje</CardTitle>
                  <CreditCard className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12% em relação a ontem</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-lg bg-white/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                  <CreditCard className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 79,14</div>
                  <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-2xl shadow-lg bg-white/90">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas transações e atividades da sua empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Aqui você pode adicionar uma lista de transações recentes */}
                  <p className="text-muted-foreground">Nenhuma transação recente para exibir.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-8">
            <Card className="rounded-2xl shadow-lg bg-white/90">
              <CardHeader>
                <CardTitle>Funcionários</CardTitle>
                <CardDescription>Gerencie os funcionários da sua empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Aqui você pode adicionar uma lista de funcionários */}
                  <p className="text-muted-foreground">Nenhum funcionário cadastrado.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-8">
            <Card className="rounded-2xl shadow-lg bg-white/90">
              <CardHeader>
                <CardTitle>Transações</CardTitle>
                <CardDescription>Visualize todas as transações da sua empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Aqui você pode adicionar uma lista de transações */}
                  <p className="text-muted-foreground">Nenhuma transação para exibir.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            <Card className="rounded-2xl shadow-lg bg-white/90">
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Configure as preferências da sua empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Aqui você pode adicionar as configurações */}
                  <p className="text-muted-foreground">Configurações em desenvolvimento.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 