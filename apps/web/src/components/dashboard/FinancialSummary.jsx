"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nathanpass/ui";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { api } from "@/services/api";

export function FinancialSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        // Supondo que companyId está disponível via contexto ou props
        const companyId = 1;
        const data = await api.get(`/financial/summary/${companyId}`);
        setSummary(data);
      } catch (err) {
        setError("Erro ao carregar resumo financeiro");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Receita Total
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {summary.totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{summary.revenueChange}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Despesas Totais
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {summary.totalExpenses.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {summary.expensesChange > 0 ? "+" : ""}{summary.expensesChange}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Lucro Líquido
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {summary.netIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {((summary.netIncome / summary.totalRevenue) * 100).toFixed(1)}% de margem
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 