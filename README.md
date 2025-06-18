# NathanPass

NathanPass é uma plataforma integrada de bem-estar e gestão para pequenas e médias empresas, oferecendo soluções para comerciantes, colaboradores e parceiros.

## Estruturação do Projeto

O projeto segue uma arquitetura de monorepo, utilizando uma estrutura organizada em pacotes compartilhados e aplicações independentes:

```
nathanpass/
├── apps/                    # Aplicações do projeto
│   ├── api/                # Backend (Node.js/Express)
│   ├── admin/              # Painel administrativo (React)
│   └── web/                # Portal web (Next.js)
│
├── packages/               # Pacotes compartilhados
│   ├── database/          # Configuração do Prisma e modelos
│   ├── ui/                # Componentes de UI compartilhados
│   └── utils/             # Funções utilitárias
│
└── package.json           # Configuração do monorepo
```

### Estrutura Detalhada de Aplicações

#### 1. API (Backend)
```
apps/api/
├── src/
│   ├── controllers/       # Lógica de negócios
│   │   ├── auth.js       # Autenticação
│   │   ├── merchant.js   # Gestão de comerciantes
│   │   └── partner.js    # Gestão de parceiros
│   │
│   ├── middlewares/      # Middlewares Express
│   │   ├── auth.js       # Autenticação
│   │   └── error-handler.js
│   │
│   ├── routes/           # Rotas da API
│   │   ├── auth.js
│   │   ├── merchant.js
│   │   └── partner.js
│   │
│   ├── config/           # Configurações
│   │   └── index.js
│   │
│   └── index.js          # Ponto de entrada
│
├── prisma/               # Schema do banco de dados
│   └── schema.prisma
│
├── .env                  # Variáveis de ambiente
└── package.json
```

#### 2. Admin (Painel Administrativo)
```
apps/admin/
├── src/
│   ├── pages/           # Páginas do admin
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   ├── Partners.jsx
│   │   ├── Merchants.jsx
│   │   └── Login.jsx
│   │
│   ├── components/      # Componentes React
│   │   └── Layout.jsx
│   │
│   ├── services/        # Serviços e integrações
│   │   └── api.js
│   │
│   ├── contexts/        # Contextos React
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Ponto de entrada
│
├── public/              # Arquivos estáticos
├── index.html
└── package.json
```

#### 3. Web (Portal Web)
```
apps/web/
├── src/
│   ├── app/            # Páginas e rotas (Next.js App Router)
│   │   ├── page.jsx    # Página inicial
│   │   ├── layout.jsx  # Layout principal
│   │   ├── globals.css # Estilos globais
│   │   │
│   │   ├── merchant/   # Rotas do portal do comerciante
│   │   │   ├── page.jsx
│   │   │   └── layout.jsx
│   │   │
│   │   ├── employee/   # Rotas do portal do colaborador
│   │   │   ├── page.jsx
│   │   │   └── layout.jsx
│   │   │
│   │   └── partner/    # Rotas do portal do parceiro
│   │       ├── page.jsx
│   │       └── layout.jsx
│   │
│   ├── components/     # Componentes React
│   │   ├── ui/        # Componentes de UI
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   └── ...
│   │   │
│   │   ├── forms/     # Componentes de formulário
│   │   │   ├── login-form.jsx
│   │   │   └── ...
│   │   │
│   │   └── layout/    # Componentes de layout
│   │       ├── header.jsx
│   │       ├── footer.jsx
│   │       └── ...
│   │
│   ├── lib/           # Utilitários e configurações
│   │   ├── utils.js   # Funções utilitárias
│   │   └── constants.js
│   │
│   └── styles/        # Estilos adicionais
│       └── theme.js   # Configuração de tema
│
├── public/            # Arquivos estáticos
│   ├── images/
│   └── fonts/
│
├── next.config.js     # Configuração do Next.js
└── package.json
```

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

## Tecnologias Utilizadas

### Tecnologias Atuais

#### Backend
- **Runtime e Framework**
  - Node.js
  - Express.js
  - JavaScript (ES6+)

#### Banco de Dados
- **ORM e Migrations**
  - Prisma
  - MySQL

#### Frontend
- **Frameworks e Bibliotecas**
  - React
  - Next.js
  - Tailwind CSS
  - Shadcn/ui
  - React Query (para gerenciamento de estado e cache)

#### Autenticação e Segurança
- JWT (JSON Web Tokens)
- Bcrypt para hash de senhas
- CORS
- Helmet para segurança HTTP

#### Desenvolvimento e DevOps
- Docker
- Docker Compose
- Git
- npm (gerenciador de pacotes)

### Tecnologias Potenciais para Implementação

#### Backend
- **Melhorias de Performance**
  - Redis para cache
  - GraphQL para APIs mais flexíveis
  - TypeScript para tipagem estática
  - NestJS como framework alternativo

#### Banco de Dados
- **Escalabilidade**
  - MongoDB para dados não estruturados
  - PostgreSQL como alternativa ao MySQL
  - Elasticsearch para busca avançada

#### Frontend
- **Melhorias de UX/UI**
  - Framer Motion para animações
  - React Hook Form para formulários
  - Zustand ou Redux Toolkit para gerenciamento de estado
  - Storybook para documentação de componentes
  - Jest e React Testing Library para testes

#### DevOps e Infraestrutura
- **CI/CD e Monitoramento**
  - GitHub Actions ou GitLab CI
  - AWS ou Google Cloud Platform
  - Kubernetes para orquestração
  - Prometheus e Grafana para monitoramento
  - Sentry para rastreamento de erros

#### Segurança
- **Autenticação Avançada**
  - OAuth 2.0
  - 2FA (Autenticação de dois fatores)
  - Passport.js para estratégias de autenticação

#### Integrações
- **Serviços Externos**
  - Stripe para pagamentos
  - SendGrid ou AWS SES para emails
  - AWS S3 para armazenamento de arquivos
  - Twilio para SMS e notificações

## Como Iniciar

### Usando Docker (Recomendado)

1. Certifique-se de ter o Docker e Docker Compose instalados

2. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nathanpass.git
   cd nathanpass
   ```

3. Inicie os containers:
   ```bash
   docker-compose up -d
   ```

4. Acesse as aplicações:
   - API: http://localhost:3001
   - Admin: http://localhost:3000
   - Web: http://localhost:3002

### Desenvolvimento Local

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

## Deploy

O projeto utiliza GitHub Actions para CI/CD. Os workflows estão configurados para fazer deploy automático quando houver push na branch `main`.

### Configuração do Deploy

1. Configure os secrets no GitHub:
   - `SSH_HOST`: Host do servidor
   - `SSH_USERNAME`: Usuário SSH
   - `SSH_KEY`: Chave SSH privada
   - `DATABASE_URL`: URL do banco de dados
   - `JWT_SECRET`: Chave secreta para JWT
   - `API_URL`: URL da API em produção

2. Estrutura de diretórios no servidor:
   ```
   /var/www/
   ├── nathanpass/     # Código fonte
   ├── admin/         # Build do Admin
   └── web/           # Build do Web
   ```

3. Configuração do servidor:
   - Node.js 18
   - PM2 para gerenciamento de processos
   - Nginx como proxy reverso
   - MySQL 8.0

### Workflows

- `api-deploy.yml`: Deploy da API
- `admin-deploy.yml`: Deploy do Admin
- `web-deploy.yml`: Deploy do Web

Cada workflow é acionado quando há alterações nos respectivos diretórios:
- `apps/api/**` para API
- `apps/admin/**` para Admin
- `apps/web/**` para Web
- `packages/**` para pacotes compartilhados 