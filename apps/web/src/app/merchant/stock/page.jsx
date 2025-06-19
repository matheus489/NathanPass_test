import React from 'react';

export default function StockPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Gestão de Estoque</h1>
      {/* Controle de Produtos, Inventário, Movimentações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          {/* Lista e formulário de produtos */}
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Movimentações de Estoque</h2>
          {/* Lista e formulário de movimentações */}
        </section>
      </div>
    </div>
  );
} 