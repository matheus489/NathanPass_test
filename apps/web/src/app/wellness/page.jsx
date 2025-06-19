'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { ContentLibrary } from '@/components/wellness/ContentLibrary';
import { PartnerMap } from '@/components/wellness/PartnerMap';
import { BookingList } from '@/components/wellness/BookingList';
import { Heart, BookOpen, MapPin, Calendar } from 'lucide-react';
import SupportChatbot from "@/components/SupportChatbot";

export default function WellnessPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('content');

  const tabList = [
    { key: 'content', label: 'Biblioteca de Conteúdo', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'partners', label: 'Parceiros', icon: <MapPin className="w-5 h-5" /> },
    { key: 'bookings', label: 'Minhas Consultas', icon: <Calendar className="w-5 h-5" /> },
  ];

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container max-w-6xl mx-auto py-12 px-4 space-y-10">
        <div className="flex items-center gap-4 bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-2xl shadow-lg mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-lg">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-lg">
              Bem-estar
            </h1>
            <p className="text-muted-foreground text-lg mt-1">
              Cuide da sua saúde e bem-estar com nossos recursos exclusivos
            </p>
          </div>
        </div>

        {/* Tabs customizadas */}
        <div className="flex gap-8 bg-slate-100 rounded-xl p-4 w-fit mx-auto my-6">
          {tabList.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium text-base
                ${activeTab === tab.key ? "bg-white shadow text-blue-600" : "text-slate-600 hover:bg-slate-200"}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        <div className="mt-12 flex flex-col gap-8">
          {activeTab === 'content' && <ContentLibrary />}
          {activeTab === 'partners' && <PartnerMap />}
          {activeTab === 'bookings' && <BookingList />}
        </div>
      </div>
      <SupportChatbot />
    </div>
  );
} 