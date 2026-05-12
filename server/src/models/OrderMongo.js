import mongoose, {Schema} from 'mongoose'

const OrderSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  itens: [{
    nome: String,
    quantidade: Number,
    preco: Number // Preço no momento da compra
  }],
  subtotal: Number,
  taxaEntrega: Number, // Salva o valor fixo da taxa no momento do pedido
  total: Number,
  status: {
    type: String,
    enum: ['pendente', 'preparando', 'saiu_para_entrega', 'entregue', 'cancelado'],
    default: 'pendente'
  },
  metodoPagamento: {
    type: String,
    enum: ['cartao_app', 'pix', 'dinheiro'],
    required: true
  },
  enderecoEntrega: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema)
export default Order