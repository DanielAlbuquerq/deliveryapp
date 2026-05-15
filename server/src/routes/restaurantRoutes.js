import express from 'express';
import { createRestaurant, getRestaurants } from '../controllers/restaurantController.js';

const router = express.Router() 

// Rota para cadastrar: POST http://localhost:5000/api/restaurants
router.post('/', createRestaurant);

// Rota para listar: GET http://localhost:5000/api/restaurants
router.get('/', getRestaurants);

export default router;