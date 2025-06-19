const { z } = require('zod');
require('dotenv').config();
const mysql = require('mysql2/promise');

const envSchema = z.object({
  // Configuração do Servidor
  PORT: z.string().transform(Number).default('3001'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Configuração do Banco de Dados
  DB_HOST: z.string().default('127.0.0.1'),
  DB_PORT: z.string().transform(Number).default('3306'),
  DB_USER: z.string().default('root'),
  DB_PASS: z.string().default(''),
  DB_NAME: z.string().default('nathanpass'),

  // Configuração do JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Configuração do CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Configuração de Email (para uso futuro)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Configuração do Gateway de Pagamento (para uso futuro)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

const env = envSchema.parse(process.env);

const config = {
  server: {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  },
  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    name: env.DB_NAME,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  cors: {
    origin: env.CORS_ORIGIN,
  },
  email: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  },
};

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { config, pool }; 