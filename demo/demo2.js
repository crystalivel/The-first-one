const express = require('express')
const app = express()
const products = ['tv', 'phone', 'tablette', 'mouse']

app.get("/products", (req, res) => {
    if (products) {

        res.status(200).json('products')
    } else {
        res.status(404).json({message:'no products found'})

    }
})

app.listen(3000, () => { console.log('ana hay hhhh') })