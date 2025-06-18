# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY packages/database/package*.json ./packages/database/
COPY apps/api/package*.json ./apps/api/

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build do pacote database
RUN npm run build --workspace=@nathanpass/database

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/database/package*.json ./packages/database/
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/apps/api/src ./apps/api/src
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Instalar apenas dependências de produção
RUN npm install --production

# Expor porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev", "--workspace=apps/api"] 