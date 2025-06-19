'use client';

import { useState, useEffect } from 'react';
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
import { MapPin, Search, Star, Clock, Phone, ExternalLink, Map } from 'lucide-react';
import haversine from "haversine-distance";
import { toast } from 'sonner';
import { api } from '@/services/api';

export function PartnerMap() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchRadius, setSearchRadius] = useState("5");
  const [userLocation, setUserLocation] = useState(null);
  // Novo estado para cadastro de parceiro
  const [newPartner, setNewPartner] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    hours: "",
    lat: "",
    lng: "",
    rating: 5.0,
  });
  // Estado para modal de agendamento
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingPartner, setBookingPartner] = useState(null);
  const [bookingData, setBookingData] = useState({ service: '', date: '', time: '' });
  const [partnerError, setPartnerError] = useState("");
  const [partnerLoading, setPartnerLoading] = useState(false);

  useEffect(() => {
    async function fetchPartners() {
      setLoading(true);
      try {
        const data = await api.get('/partner');
        setPartners(data);
      } catch (err) {
        setPartnerError('Erro ao carregar parceiros');
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  // Tentar pegar localização real do usuário
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        // Fallback: centro de SP
        setUserLocation({ lat: -23.5505, lng: -46.6333 });
      }
    );
  } else {
    setUserLocation({ lat: -23.5505, lng: -46.6333 });
  }

  // Calcular distância real
  const partnersWithDistance = partners.map((partner) => {
    if (!userLocation) return { ...partner, distance: null };
    const dist = haversine(
      { lat: userLocation.lat, lng: userLocation.lng },
      { lat: partner.lat, lng: partner.lng }
    );
    return { ...partner, distance: dist / 1000 };
  });

  const filteredPartners = partnersWithDistance.filter(
    (partner) =>
      partner.distance !== null && partner.distance <= parseFloat(searchRadius)
  );

  // Função para abrir todos os parceiros no Google Maps
  function openAllPartnersOnMap() {
    if (filteredPartners.length === 0) return;
    // Monta uma query com todos os endereços separados por |
    const addresses = filteredPartners.map(p => encodeURIComponent(p.address)).join('|');
    // Abre o Google Maps com busca por múltiplos endereços
    window.open(`https://www.google.com/maps/dir/${addresses}`, '_blank');
  }

  async function handleAddPartner(e) {
    e.preventDefault();
    setPartnerError("");
    setPartnerLoading(true);
    try {
      const created = await api.post('/partner', newPartner);
      setPartners((prev) => [...prev, created]);
      setNewPartner({ name: "", description: "", address: "", phone: "", hours: "", lat: "", lng: "", rating: 5.0 });
      toast.success("Parceiro cadastrado com sucesso!");
    } catch (err) {
      setPartnerError("Erro ao cadastrar parceiro");
    } finally {
      setPartnerLoading(false);
    }
  }

  async function handleRemovePartner(id) {
    try {
      await api.delete(`/partner/${id}`);
      setPartners((prev) => prev.filter((p) => p.id !== id));
      toast.success("Parceiro removido!");
    } catch (err) {
      toast.error("Erro ao remover parceiro");
    }
  }

  function openBookingModal(partner) {
    setBookingPartner(partner);
    setBookingData({ service: '', date: '', time: '' });
    setShowBookingModal(true);
  }

  async function handleBook(e) {
    e.preventDefault();
    try {
      await api.post('/employee/bookings', {
        ...bookingData,
        partnerId: bookingPartner.id,
      });
      setShowBookingModal(false);
      toast.success('Agendamento realizado!');
    } catch (err) {
      toast.error('Erro ao agendar serviço');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="number"
            placeholder="Raio de busca (km)"
            value={searchRadius}
            onChange={(e) => setSearchRadius(e.target.value)}
            className="pl-9 bg-background/50 backdrop-blur-sm"
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 mt-2 sm:mt-0 whitespace-nowrap"
          onClick={openAllPartnersOnMap}
          disabled={filteredPartners.length === 0}
        >
          <Map className="w-4 h-4" /> Ver parceiros no mapa
        </Button>
      </div>

      {/* Formulário de cadastro de parceiro */}
      <form onSubmit={handleAddPartner} className="flex flex-col md:flex-row gap-4 items-end bg-white/90 rounded-xl shadow p-6 mb-4">
        <Input
          placeholder="Nome"
          value={newPartner.name}
          onChange={e => setNewPartner({ ...newPartner, name: e.target.value })}
          className="w-full md:w-44"
        />
        <Input
          placeholder="Descrição"
          value={newPartner.description}
          onChange={e => setNewPartner({ ...newPartner, description: e.target.value })}
          className="w-full md:w-44"
        />
        <Input
          placeholder="Endereço"
          value={newPartner.address}
          onChange={e => setNewPartner({ ...newPartner, address: e.target.value })}
          className="w-full md:w-44"
        />
        <Input
          placeholder="Telefone"
          value={newPartner.phone}
          onChange={e => setNewPartner({ ...newPartner, phone: e.target.value })}
          className="w-full md:w-36"
        />
        <Input
          placeholder="Horário"
          value={newPartner.hours}
          onChange={e => setNewPartner({ ...newPartner, hours: e.target.value })}
          className="w-full md:w-36"
        />
        <Input
          type="number"
          step="any"
          placeholder="Latitude"
          value={newPartner.lat}
          onChange={e => setNewPartner({ ...newPartner, lat: e.target.value })}
          className="w-full md:w-32"
        />
        <Input
          type="number"
          step="any"
          placeholder="Longitude"
          value={newPartner.lng}
          onChange={e => setNewPartner({ ...newPartner, lng: e.target.value })}
          className="w-full md:w-32"
        />
        <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80" disabled={partnerLoading || !newPartner.name || !newPartner.address || !newPartner.phone || !newPartner.hours || !newPartner.lat || !newPartner.lng}>Cadastrar</Button>
      </form>
      {partnerError && <div className="text-red-600 text-sm mt-2">{partnerError}</div>}
      {partnerLoading && <div className="text-primary text-sm mt-2">Cadastrando parceiro...</div>}

      <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="group hover:shadow-lg transition-shadow duration-200 w-full h-full flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors truncate break-words">
                    {partner.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 break-words mt-1">
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
                {partner.distance ? partner.distance.toFixed(2) : "-"} km de distância
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full group-hover:bg-primary/90 transition-colors"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`, '_blank')}
                variant="default"
              >
                Ver no Google Maps
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button className="w-full" variant="outline" onClick={() => handleRemovePartner(partner.id)}>
                Remover parceiro
              </Button>
              <Button className="w-full" variant="secondary" onClick={() => openBookingModal(partner)}>
                Agendar
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

      {/* Modal de agendamento */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowBookingModal(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4">Agendar com {bookingPartner?.name}</h3>
            <form onSubmit={handleBook} className="flex flex-col gap-4">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Serviço"
                value={bookingData.service}
                onChange={e => setBookingData({ ...bookingData, service: e.target.value })}
                required
              />
              <input
                className="border rounded-lg px-3 py-2"
                type="date"
                value={bookingData.date}
                onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                required
              />
              <input
                className="border rounded-lg px-3 py-2"
                type="time"
                value={bookingData.time}
                onChange={e => setBookingData({ ...bookingData, time: e.target.value })}
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80">Confirmar Agendamento</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 