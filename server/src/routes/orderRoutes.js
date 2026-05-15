import express from 'express';
import router from 'express.Router()';
import { createOrder, getOrders } from '../controllers/orderController.js';

// Rota para criar um novo pedido: POST http://localhost:5000/api/orders
router.post('/', createOrder);

// Rota para listar pedidos: GET http://localhost:5000/api/orders
router.get('/', getOrders);

export default router;