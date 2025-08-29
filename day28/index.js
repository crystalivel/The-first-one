const express = require('express')
const mongoose = require('mongoose')
const Products = require('./product-schema')


const app = express()
app.use(express.json())
const port = 5100
const MONGO_URI = 'mongodb://localhost:27017/taskdb'

mongoose.connect(MONGO_URI)

const errorHandler = fn => (req,res,next) => { Promise.resolve(fn(req,res,next)).catch(next)}

//show all products in asending order
app.get('/',errorHandler(async(req,res)=>{
    const product = await Products.find().sort({name: 1})
    res.send(product)
}))
//add a product 
app.post('/',errorHandler(async(req,res)=> {
    const newProduct = await Products.create(req.body)
    if (!newProduct){res.status(404).json({message:'error'})}
    res.status(201).send(newProduct)
}))
// filter products by price and stock
app.get('/products',errorHandler(async(req,res)=> {
    const {price,page} = req.query
    let pageSize = 5
    const product = await Products.find().sort({price:-1}).skip((page - 1)* pageSize).limit(pageSize)
        res.status(200).send(product)
}))
app.get('/stock',errorHandler(async(req,res)=> {
    const product = await Products.aggregate([{
        $group:{
            _id: "$inStock",
            count:{ $sum: 1},
            name: {$push:"$name"}
        }
    }])
    res.status(200).send(product)
}))
app.get('/avg',errorHandler(async(req,res) => {
    const product = await Products.aggregate([{
        $group:{
            _id:"",
            averagePrice: {$avg:"$price"}
        }
    }])
    res.status(200).send(product)
}))
app.get('/type',errorHandler(async(req,res) => {
    const product = await Products.aggregate([{
        $group:{ 
            _id: '$description',
            name: {$push:"$name"}
        }
    }])
    res.status(200).send(product)
}))


app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).json({error:`server error ${err}` })})

    app.listen(port,() => {
    console.log(`the server is listening on ${port}`)
})
