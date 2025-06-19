'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Button,
} from '@nathanpass/ui';
import { MapPin, Search, Star, Clock, Phone, ExternalLink } from 'lucide-react';

export function PartnerMap() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchRadius, setSearchRadius] = useState("5");
  const [userLocation, setUserLocation] = useState(null);

  useState(() => {
    // Simular localização do usuário
    setUserLocation({
      lat: -23.5505,
      lng: -46.6333,
    });

    // Simular carregamento de parceiros
    setTimeout(() => {
      setPartners([
        {
          id: 1,
          name: "Clínica Saúde Total",
          description: "Clínica especializada em medicina preventiva e bem-estar",
          distance: 2.5,
          rating: 4.8,
          address: "Av. Paulista, 1000",
          phone: "(11) 9999-9999",
          hours: "Seg-Sex: 8h-20h",
        },
        {
          id: 2,
          name: "Studio Yoga & Pilates",
          description: "Aulas de yoga, pilates e meditação para todos os níveis",
          distance: 3.2,
          rating: 4.9,
          address: "Rua Augusta, 500",
          phone: "(11) 8888-8888",
          hours: "Seg-Sáb: 7h-21h",
        },
        {
          id: 3,
          name: "NutriVida",
          description: "Consultoria nutricional personalizada",
          distance: 4.1,
          rating: 4.7,
          address: "Rua Consolação, 2000",
          phone: "(11) 7777-7777",
          hours: "Seg-Sex: 9h-19h",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPartners = partners.filter(
    (partner) => partner.distance <= parseFloat(searchRadius)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="number"
            placeholder="Raio de busca (km)"
            value={searchRadius}
            onChange={(e) => setSearchRadius(e.target.value)}
            className="pl-9 bg-background/50 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {partner.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {partner.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium">{partner.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {partner.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                {partner.hours}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                {partner.phone}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <MapPin className="w-4 h-4" />
                {partner.distance} km de distância
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group-hover:bg-primary/90 transition-colors">
                Ver detalhes
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum parceiro encontrado</h3>
          <p className="text-muted-foreground mt-1">
            Tente aumentar o raio de busca para encontrar mais parceiros
          </p>
        </div>
      )}
    </div>
  );
} 