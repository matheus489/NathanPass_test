import React from 'react';

export default function LoyaltyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Programa de Fidelidade</h1>
      {/* Programa de Pontos, Recompensas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Pontos e Recompensas</h2>
          {/* Listagem de pontos, resgate de recompensas */}
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Configuração do Programa</h2>
          {/* Configuração de regras, campanhas */}
        </section>
      </div>
    </div>
  );
} 