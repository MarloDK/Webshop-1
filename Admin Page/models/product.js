const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    img_src: {
        type: String,
        default: "https://via.placeholder.com/250/",
        required: false,
    },

    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('products', productSchema)