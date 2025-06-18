# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY packages/ui/package*.json ./packages/ui/
COPY apps/web/package*.json ./apps/web/

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build do pacote UI
RUN npm run build --workspace=@nathanpass/ui

# Build da aplicação web
RUN npm run build --workspace=apps/web

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/ui/package*.json ./packages/ui/
COPY --from=builder /app/apps/web/package*.json ./apps/web/
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public

# Instalar apenas dependências de produção
RUN npm install --production

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start", "--workspace=apps/web"] 