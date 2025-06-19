"use client";

import { useAuth } from "@/components/AuthContext";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { ClientList } from "@/components/dashboard/ClientList";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nathanpass/ui";
import { Plus, Users, Receipt, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center">
      <div className="container max-w-6xl mx-auto py-12 px-4 space-y-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-2xl shadow-lg">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-lg">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-lg">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Gerencie suas finanças e clientes
              </p>
            </div>
          </div>
          <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md">
                <Plus className="w-5 h-5 mr-2" /> Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da transação abaixo
                </DialogDescription>
              </DialogHeader>
              <TransactionForm onSuccess={() => setIsTransactionDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <FinancialSummary />

        <Tabs defaultValue="transactions" className="space-y-8">
          <TabsList className="bg-primary/5 p-1 rounded-lg flex gap-2">
            <TabsTrigger value="transactions" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Receipt className="w-5 h-5" /> Transações
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-5 h-5" /> Clientes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <TransactionList />
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <ClientList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 