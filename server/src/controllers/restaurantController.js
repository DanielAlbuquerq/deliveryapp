import prisma from "../config/db.js"

// Criar um novo restaurante
export const createRestaurant = async (req, res) => {
  try {
    const { nome, logo, categoria, taxaEntrega, raioEntregaKm, lat, lng } = req.body;
    
    const newRestaurant = await prisma.restaurant.create({
      data: { nome, logo, categoria, taxaEntrega, raioEntregaKm, lat, lng }
    });
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar restaurante: " + error.message });
  }
};  

// Listar todos os restaurantes
export const getRestaurants = async (req, res) => {
  try{
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  }catch{
    res.status(500).json({ error: "Erro ao buscar restaurantes: " + error.message });
  }};

export { createRestaurant, getRestaurants };