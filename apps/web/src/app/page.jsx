"use client";

import Link from "next/link";
import { ArrowRight, Users, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-lg">
          Bem-vindo ao NathanPass
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/wellness" className="group block rounded-2xl bg-white/80 backdrop-blur-md border border-primary/10 shadow-xl hover:shadow-2xl transition-all p-8 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <Users className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Portal do Colaborador</span>
              <ArrowRight className="w-6 h-6 ml-auto text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-muted-foreground text-lg">
              Acesse seus benefícios de bem-estar e agende serviços.
            </p>
          </Link>
          <Link href="/merchant" className="group block rounded-2xl bg-white/80 backdrop-blur-md border border-primary/10 shadow-xl hover:shadow-2xl transition-all p-8 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <Building2 className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Portal do Parceiro</span>
              <ArrowRight className="w-6 h-6 ml-auto text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-muted-foreground text-lg">
              Gerencie seus serviços e agendamentos.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
} 