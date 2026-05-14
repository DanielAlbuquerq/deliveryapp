import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { Pool } from 'pg'

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado ao PostgreSQL com sucesso via Prisma!"); //[cite: 112]
  } catch (e) {
    console.error("Falha na conexão com o banco:", e);
  }
};

export { prisma, testConnection };