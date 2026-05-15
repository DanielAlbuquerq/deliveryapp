import { create } from "node:domain";
import {prisma} from "../config/prisma.js";

// Criar um novo pedido
export const createOrder = async (req, res) => {
    try {
        const {restaurantId, itens, metodoPagamento, enderecoEntrega} = req.body

        //1. Buscar o restaurante para obter a taxa de entrega fixa atual
        const restaurant = await prisma.restaurant.findUnique({
            where: {id: restaurantId}
            //Caso não encontre o restaurante, o prisma retorna null, então é importante verificar isso antes de tentar acessar restaurant.taxaEntrega
        });

        if(!restaurant){
            return res.status(404).json({error: "Restaurante não encontrado"});
        }

        //2. Calcular o subtotal (em centavos) somando o preço de cada item multiplicado pela quantidade
        const subtotal = itens.reduce((acc, item) => {
            return acc + (item.preco * item.quantidade), 0;
        })

        //3. Obter a taxa fixa do restaurante
        const taxaEntrega = restaurant.taxaEntrega;

        //4. Calcular o total final 
        const total = subtotal + taxaEntrega

        //5. Criar o pedido no PostgreSQL
        const newOrder = await prisma.order.create({
            data: {
                restaurantId,
                itens, //O prisma salva como Json no PostgreSQL
                subtotal,
                taxaEntrega, //Valor fixo capturado agora
                total, 
                metodoPagamento,
                status: 'pendente',
                //Aqui podemos adicionar o ID do cliente vindo do JWT (req.user.id)
            },
            });

            res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({error: "Erro ao criar pedido: " + error.message});
    }};
    
    // Listar pedidos de um restaurante (pode ser usado pelo cliente ou pelo restaurante)
    export const getOrders = async (req, res) => {
        try {
            const orders = await prisma.order.findMany({
                include: { restaurante: true}, //Traz os dados do restaurante junto 
                orderBy: { createdAt: 'desc' }, //Ordena do mais recente para o mais antigo
            });
            res.json(orders);                                                               
        } catch (error){
            res.status(500).json({error: "Erro ao buscar pedidos: " + error.message});
        }
    }