import React from 'react';

export default function GamificationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Gamificação</h1>
      {/* Desafios, Rankings, Medalhas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Desafios</h2>
          {/* Lista de desafios */}
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Rankings e Medalhas</h2>
          {/* Rankings, medalhas, conquistas */}
        </section>
      </div>
    </div>
  );
} 