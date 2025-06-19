import React from 'react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Gestão de Pedidos</h1>
      {/* Recebimento, Gestão, Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Pedidos Recebidos</h2>
          {/* Lista de pedidos, filtros */}
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Detalhes do Pedido</h2>
          {/* Detalhes, status, ações */}
        </section>
      </div>
    </div>
  );
} 