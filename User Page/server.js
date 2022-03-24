//#region Express Setup
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'))
//#endregion

const mongoose = require('mongoose')
const product = require('./models/product')

mongoose.connect('mongodb+srv://WebshopProject:TestPassword@webshop.d9cpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', async (req, res) => {
    const allProducts = await product.find()
    res.render('index', {products: allProducts})
})

app.get('/product/:productId', (req, res) => {
    const foundProduct = product.findOne({ id: req.params.productId })
    res.render('product', {product: foundProduct})
})

app.listen('8080')