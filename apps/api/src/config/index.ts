import { z } from "zod"

const envSchema = z.object({
  // Server Configuration
  PORT: z.string().transform(Number).default("3001"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Database Configuration
  DATABASE_URL: z.string(),

  // JWT Configuration
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // CORS Configuration
  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  // Email Configuration (for future use)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Payment Gateway Configuration (for future use)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
})

const env = envSchema.parse(process.env)

export const config = {
  server: {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
  },
  database: {
    url: env.DATABASE_URL,
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
} as const

export type Config = typeof config 