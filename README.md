# NathanPass

NathanPass é uma plataforma integrada de bem-estar e gestão para pequenas e médias empresas, oferecendo soluções para comerciantes, colaboradores e parceiros.

## Estrutura do Projeto

O projeto é dividido em três aplicações principais e um conjunto de pacotes compartilhados:

### Pacotes Compartilhados (`packages/`)
Pacotes reutilizáveis compartilhados entre as aplicações:

- **`database/`**: 
  - Configuração e modelos do Prisma
  - Gerenciamento de conexão com o banco de dados
  - Schemas e tipos do banco de dados
  - Usado por todas as aplicações para acesso ao banco de dados

- **`ui/`**: 
  - Componentes de interface reutilizáveis
  - Configurado com TypeScript
  - Usa tsup para build
  - Compartilha componentes entre admin e web
  - Inclui temas, estilos e componentes comuns

- **`utils/`**: 
  - Funções utilitárias compartilhadas
  - Funções auxiliares para uso em todas as aplicações

### 1. API (`apps/api/`)
Backend da aplicação, responsável por toda a lógica de negócios e integração com o banco de dados.

- **`src/controllers/`**: Controladores que gerenciam as requisições HTTP
  - `auth.js`: Autenticação e autorização
  - `merchant.js`: Gestão de comerciantes e empresas
  - `partner.js`: Gestão de parceiros e serviços

- **`src/middlewares/`**: Middlewares da aplicação
  - `auth.js`: Middleware de autenticação
  - `error-handler.js`: Tratamento de erros

- **`src/routes/`**: Definição das rotas da API
  - `auth.js`: Rotas de autenticação
  - `merchant.js`: Rotas para comerciantes
  - `partner.js`: Rotas para parceiros

### 2. Admin (`apps/admin/`)
Painel administrativo para gerenciamento do sistema.

- **`src/pages/`**: Páginas do painel admin
  - `Dashboard.jsx`: Visão geral do sistema
  - `Employees.jsx`: Gestão de colaboradores
  - `Partners.jsx`: Gestão de parceiros
  - `Merchants.jsx`: Gestão de comerciantes
  - `Login.jsx`: Página de login

- **`src/components/`**: Componentes reutilizáveis
  - `Layout.jsx`: Layout principal do admin

- **`src/services/`**: Serviços de integração com a API
  - `api.js`: Configuração e funções de API

- **`src/contexts/`**: Contextos do React
  - `AuthContext.jsx`: Contexto de autenticação

### 3. Web (`apps/web/`)
Aplicação web principal, portal de acesso para todos os usuários.

- **`src/app/`**: Páginas da aplicação web
  - `page.jsx`: Página inicial
  - `layout.jsx`: Layout principal
  - `globals.css`: Estilos globais

- **`src/components/`**: Componentes reutilizáveis
  - `theme-provider.jsx`: Provedor de tema

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - Prisma (ORM)
  - MySQL
  - JWT para autenticação

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - Shadcn/ui

## Como Iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o banco de dados:
   - Certifique-se de ter o MySQL instalado e rodando
   - Crie um banco de dados chamado `nathanpass`
   - Copie o arquivo `.env.example` para `.env` na pasta `apps/api`
   - Ajuste as variáveis de ambiente conforme necessário

3. Inicialize o banco de dados:
   ```bash
   npm run db:init
   ```

4. Inicie a API:
   ```bash
   cd apps/api
   npm run dev
   ```

5. Inicie o painel admin:
   ```bash
   cd apps/admin
   npm run dev
   ```

6. Inicie a aplicação web:
   ```bash
   cd apps/web
   npm run dev
   ```

## Acesso

- **API**: http://localhost:3001
- **Admin**: http://localhost:3000
- **Web**: http://localhost:3002

### Credenciais Padrão (Admin)
- Email: admin@nathanpass.com
- Senha: admin123

## Funcionalidades

### Portal do Comerciante
- Gestão financeira
- CRM
- Benefícios para colaboradores
- Relatórios e análises

### Portal do Colaborador
- Acesso aos benefícios
- Agendamento de serviços
- Histórico de utilização
- Perfil e preferências

### Portal do Parceiro
- Gestão de serviços
- Agendamentos
- Relatórios de utilização
- Configurações de disponibilidade 