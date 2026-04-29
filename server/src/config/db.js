import dotenv from "dotenv"
import mongoose from "mongoose"

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

export default connectDB;