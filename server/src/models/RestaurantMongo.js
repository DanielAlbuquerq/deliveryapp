import mongoose, { Schema } from "mongoose"

const RestaurantSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true 
    },
    logo: {
        type: String, //URL da imagem (S3 ou Cloudinary)
        required: true,
    },
    categoria:{
        type: String, 
        enum: ['Lanches', 'Japonesa', 'Pizza', 'Brasileira', 'Doces'],
        required: true
    },
    //Configuração de Entrega
    taxaEntrega: {
        type: Number, 
        required: true,
        default: 0 //Valor fixo em centavos (ex: 700 para 7,00)
    },
    raioEntregaKm: {
        type: Number,
        required: true,
        default: 5 //Raio máximo de atendimento
    },
    // Localização para o MongoDB Geospatial
    localização: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], //[longitude, latitude]
            required: true,
        }, 
    },
    tempoEntregaEstimado:{
        type: String, // Ex: "30-40"
        default: "30 min"
    },
    ativo:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

// Criação do índice para buscas por proximidade
RestaurantSchema.index({ localizacao: '2dsphere' });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)
export default Restaurant