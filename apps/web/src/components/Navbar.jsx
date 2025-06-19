'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';
import { UserMenu } from './UserMenu';
import { Button } from '@nathanpass/ui';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-gradient-to-r from-primary/10 via-background to-primary/5 shadow-md sticky top-0 z-50">
      <div className="flex h-16 items-center px-6 container mx-auto max-w-7xl">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2 group select-none">
          <Sparkles className="w-7 h-7 text-primary group-hover:animate-pulse" />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow">NathanPass</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="rounded-full px-4 py-2 hover:bg-primary/10">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild className="rounded-full px-4 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md">
                <Link href="/register">Criar Conta</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 