// Carrega as variáveis do .env
// Server/src/server.js
import DBsConnections from "./src/config/db.js"
import express, { application } from "express"
import cors from "cors";

const app = express();

// Conectar ao Banco de Dados
DBsConnections.connectDB(); //MongoDB
DBsConnections.testConnection();//Postgre

// Middlewares
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Permite que o servidor entenda JSON [cite: 60]

// Rota de Teste (Health Check)
app.get('/api/test', (req, res) => {
  res.json({ 
    message: "Servidor do Delivery App funcionando!",
    status: "OK",
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
