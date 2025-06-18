# NathanPass Admin

Interface administrativa para o sistema NathanPass, desenvolvida com React e Material-UI.

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Visualiza a versão de produção localmente
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/       # Contextos do React
  ├── hooks/          # Hooks personalizados
  ├── pages/          # Páginas da aplicação
  ├── services/       # Serviços e APIs
  ├── utils/          # Funções utilitárias
  ├── App.jsx         # Componente principal
  ├── main.jsx        # Ponto de entrada
  └── theme.js        # Configuração do tema
```

## Funcionalidades

- Autenticação de usuários
- Gerenciamento de comerciantes
- Gerenciamento de parceiros
- Gerenciamento de funcionários
- Dashboard com estatísticas
- Interface responsiva
- Tema personalizado

## Tecnologias Utilizadas

- React
- Material-UI
- React Router
- React Query
- Formik
- Yup
- Axios
- Vite 