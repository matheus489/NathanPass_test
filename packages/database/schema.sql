-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `NathanPass` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `NathanPass`;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('MERCHANT','EMPLOYEE','PARTNER') NOT NULL,
  company_id VARCHAR(36),
  merchant_of_id VARCHAR(36),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Empresas
CREATE TABLE IF NOT EXISTS companies (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  size INT,
  address VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(255),
  merchant_id VARCHAR(36) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  cost DECIMAL(12,2) NOT NULL,
  stock INT NOT NULL,
  category VARCHAR(255),
  company_id VARCHAR(36) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Movimentações de Estoque
CREATE TABLE IF NOT EXISTS inventory_movements (
  id VARCHAR(36) PRIMARY KEY,
  product_id VARCHAR(36) NOT NULL,
  type VARCHAR(32) NOT NULL,
  quantity INT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Contas a Pagar/Receber
CREATE TABLE IF NOT EXISTS accounts (
  id VARCHAR(36) PRIMARY KEY,
  type VARCHAR(16) NOT NULL,
  description TEXT,
  value DECIMAL(12,2) NOT NULL,
  due_date DATETIME NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  paid_date DATETIME,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Conciliação Bancária
CREATE TABLE IF NOT EXISTS bank_reconciliations (
  id VARCHAR(36) PRIMARY KEY,
  date DATETIME NOT NULL,
  description TEXT,
  amount DECIMAL(12,2) NOT NULL,
  reconciled BOOLEAN DEFAULT FALSE,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Reservas Financeiras
CREATE TABLE IF NOT EXISTS financial_reserves (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  target_value DECIMAL(12,2) NOT NULL,
  current_value DECIMAL(12,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Promoções
CREATE TABLE IF NOT EXISTS promotions (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Programas de Fidelidade
CREATE TABLE IF NOT EXISTS loyalty_programs (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points_per_real DECIMAL(8,2) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY,
  client_id VARCHAR(36) NOT NULL,
  products JSON NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  status VARCHAR(32) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Comissões
CREATE TABLE IF NOT EXISTS commissions (
  id VARCHAR(36) PRIMARY KEY,
  employee_id VARCHAR(36) NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  reference VARCHAR(255),
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Faltas/Afastamentos
CREATE TABLE IF NOT EXISTS absences (
  id VARCHAR(36) PRIMARY KEY,
  employee_id VARCHAR(36) NOT NULL,
  type VARCHAR(16) NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME,
  reason TEXT,
  company_id VARCHAR(36) NOT NULL
);

-- Tabela de Diário de Emoções
CREATE TABLE IF NOT EXISTS emotion_diaries (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  emotion VARCHAR(64) NOT NULL,
  notes TEXT
);

-- Tabela de Gamificação
CREATE TABLE IF NOT EXISTS gamifications (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  points INT NOT NULL,
  badges JSON,
  level INT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Comunidade
CREATE TABLE IF NOT EXISTS community_posts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  comments JSON
);

-- Tabela de Notificações
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Insights de Negócio
CREATE TABLE IF NOT EXISTS business_insights (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  type VARCHAR(64) NOT NULL,
  data JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Exportação Contábil
CREATE TABLE IF NOT EXISTS accounting_exports (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  period VARCHAR(32) NOT NULL,
  data JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Notas Fiscais
CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  number VARCHAR(64) NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  issue_date DATETIME NOT NULL,
  status VARCHAR(32) NOT NULL,
  client_id VARCHAR(36)
);

-- Tabela de Boletos
CREATE TABLE IF NOT EXISTS boletos (
  id VARCHAR(36) PRIMARY KEY,
  company_id VARCHAR(36) NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  due_date DATETIME NOT NULL,
  status VARCHAR(32) NOT NULL,
  client_id VARCHAR(36)
);

-- Tabela de Dados de Wearable
CREATE TABLE IF NOT EXISTS wearable_data (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  steps INT,
  sleep_hours DECIMAL(5,2),
  calories DECIMAL(8,2),
  heart_rate INT,
  data JSON
);

-- Tabela de Transações Financeiras
CREATE TABLE IF NOT EXISTS financial_transactions (
  id VARCHAR(36) PRIMARY KEY,
  amount DECIMAL(12,2) NOT NULL,
  type ENUM('SUBSCRIPTION','SERVICE','REFUND') NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  company_id VARCHAR(36) NOT NULL
); 