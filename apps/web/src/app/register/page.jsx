"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@nathanpass/ui";
import { Input } from "@nathanpass/ui";
import { Label } from "@nathanpass/ui";
import { toast } from "sonner";
import { UserPlus, User, Mail, Lock, Building } from 'lucide-react';
import { API_BASE } from "@/services/api";

const ROLES = [
  { value: 'MERCHANT', label: 'Comerciante' },
  { value: 'EMPLOYEE', label: 'Colaborador' },
  { value: 'PARTNER', label: 'Parceiro' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: '',
    companyId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          companyId: formData.companyId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erro detalhado do backend:", errorData);
        toast.error(errorData.errors?.[0]?.message || errorData.message || "Falha no cadastro");
        throw new Error(errorData.message || "Falha no cadastro");
      }

      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      toast.error("Erro ao realizar cadastro");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <UserPlus className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Criar Conta</h1>
          <p className="text-muted-foreground">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Nome
            </Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Senha
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirmar Senha
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tipo de Conta
            </Label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded-md px-3 py-2 bg-background"
            >
              <option value="">Selecione...</option>
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          {formData.role === 'EMPLOYEE' && (
            <div className="space-y-2">
              <Label htmlFor="companyId" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                ID da Empresa
              </Label>
              <Input
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                disabled={loading}
                placeholder="Solicite ao seu gestor"
                required
                className="bg-background"
              />
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full shadow-md" 
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <div className="text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
} 