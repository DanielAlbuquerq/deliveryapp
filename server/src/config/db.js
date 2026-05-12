import dotenv from "dotenv"
import mongoose from "mongoose"
import { PrismaClient } from "@prisma/client"

// Carrega o MONGO_URI
dotenv.config()

const connectDB = async () => {
  try {
    // A URI de conexão deve estar no arquivo .env para segurança
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Conectado, este é o seu host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Encerra o processo em caso de falha crítica
  }
};

const prisma = new PrismaClient();

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado ao PostgreSQL com sucesso via Prisma!"); //[cite: 112]
  } catch (e) {
    console.error("Falha na conexão com o banco:", e);
  }
};

export default {connectDB, testConnection, prisma};
