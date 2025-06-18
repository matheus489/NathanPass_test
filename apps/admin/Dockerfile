# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY packages/ui/package*.json ./packages/ui/
COPY apps/admin/package*.json ./apps/admin/

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build do pacote UI
RUN npm run build --workspace=@nathanpass/ui

# Build da aplicação admin
RUN npm run build --workspace=apps/admin

# Estágio de produção
FROM nginx:alpine

# Copiar build da aplicação
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 3000

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 