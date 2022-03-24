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
const product = require('../User Page/models/product')

mongoose.connect('mongodb+srv://WebshopProject:TestPassword@webshop.d9cpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/addProduct', async (req, res) => {
    const productName = req.body.productName
    const productPrice = req.body.productPrice
    const productDescription = req.body.productDescription

    // If the above variables aren't set, return
    if (!productName || !productPrice || !productDescription) return res.redirect('/')
    
    try {
        const amountOfProducts = product.length

        await product.create({
            id: amountOfProducts + 1,
            name: productName,
            price: productPrice,
            img_src: "https://via.placeholder.com/250/",
            description: productDescription
        })

        res.send("Name: " + productName + " Price: " + productPrice + "\nDescription: " + productDescription)

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})


app.listen('8000')