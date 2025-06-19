"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nathanpass/ui";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export function FinancialSummary() {
  const [summary, setSummary] = useState({
    totalRevenue: 12500,
    totalExpenses: 8500,
    netIncome: 4000,
    revenueChange: 12.5,
    expensesChange: -5.2,
  });

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