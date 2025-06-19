import React from 'react';

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Comunidade</h1>
      {/* Fórum, Grupos, Postagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Fórum</h2>
          {/* Lista de tópicos, postagens */}
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Grupos</h2>
          {/* Lista de grupos, interações */}
        </section>
      </div>
    </div>
  );
} 