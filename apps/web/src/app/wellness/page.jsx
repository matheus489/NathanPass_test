'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { ContentLibrary } from '@/components/wellness/ContentLibrary';
import { PartnerMap } from '@/components/wellness/PartnerMap';
import { BookingList } from '@/components/wellness/BookingList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@nathanpass/ui';
import { Heart, BookOpen, MapPin, Calendar } from 'lucide-react';

export default function WellnessPage() {
  const { user } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [user, router]);

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center">
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

        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="bg-primary/5 p-1 rounded-lg flex gap-2">
            <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="w-5 h-5" /> Biblioteca de Conteúdo
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-5 h-5" /> Parceiros
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-5 h-5" /> Minhas Consultas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <ContentLibrary />
          </TabsContent>

          <TabsContent value="partners" className="space-y-4">
            <PartnerMap />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <BookingList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 