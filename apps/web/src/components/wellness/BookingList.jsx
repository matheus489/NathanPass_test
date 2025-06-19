'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@nathanpass/ui';
import { Calendar, Clock, MapPin, User, X, CheckCircle2, AlertCircle, Clock as ClockIcon } from 'lucide-react';
import { toast } from 'sonner';

export function BookingList({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar agendamentos do localStorage
  useEffect(() => {
    function loadBookings() {
      const stored = JSON.parse(localStorage.getItem('wellness_bookings') || '[]');
      setBookings(stored);
      setLoading(false);
    }
    loadBookings();
    window.addEventListener('wellness_bookings_update', loadBookings);
    return () => window.removeEventListener('wellness_bookings_update', loadBookings);
  }, []);

  const handleCancelBooking = (bookingId) => {
    const updated = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('wellness_bookings', JSON.stringify(updated));
    toast.success('Agendamento cancelado com sucesso!');
    window.dispatchEvent(new Event('wellness_bookings_update'));
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          icon: ClockIcon,
          label: 'Pendente',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
        };
      case 'confirmed':
        return {
          icon: CheckCircle2,
          label: 'Confirmado',
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          label: 'Concluído',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
        };
      default:
        return {
          icon: AlertCircle,
          label: 'Desconhecido',
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => {
          const statusInfo = getStatusInfo(booking.status);
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={booking.id} className="group hover:shadow-lg transition-shadow duration-200 w-full h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors truncate break-words">
                      {booking.service}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 break-words mt-1">
                      {booking.partner}
                    </CardDescription>
                  </div>
                  <div className={`flex items-center gap-1 ${statusInfo.bgColor} ${statusInfo.color} px-2 py-1 rounded-full`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{statusInfo.label}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(booking.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {booking.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Local do serviço
                </div>
              </CardContent>
              <CardFooter>
                {booking.status === 'pending' && (
                  <Button
                    variant="destructive"
                    className="w-full group-hover:bg-destructive/90 transition-colors"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar Agendamento
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum agendamento encontrado</h3>
          <p className="text-muted-foreground mt-1">
            Você ainda não possui agendamentos. Agende um serviço para começar!
          </p>
        </div>
      )}
    </div>
  );
} 