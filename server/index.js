import {prisma, testConnection} from "./src/config/prisma.js"
import express from "express"
import cors from "cors";
import restaurantRoutes from "./src/routes/restaurantRoutes.js";

const app = express();

// Middlewares
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Permite que o servidor entenda JSON [cite: 60]
app.use(express.urlencoded({ extended: true })); // Permite entender dados de formulários

// Conectar ao Banco de Dados
// connectDB(); //MongoDB File: Config/db.js
// testConnection();//Postgre OPICONAL TESTAR BANCO DE DADOS AQUI MESMO, OU DEIXAR PARA TESTAR NAS ROTAS

// export async function getRestaurant(){
//   const restaurant = await prisma.restaurant.findMany();
//   console.log(restaurant);
// }

//Rotas
app.use('/api/restaurants', restaurantRoutes); // Rota para restaurantes

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

