const express = require('express');

const app = express();
const port = 5000

app.use(express.json())

const products = [
    { id: 1, name: 'Apples', price: 200 },
    { id: 2, name: 'Oranges', price: 150 },
    { id: 3, name: 'Pears', price: 300 },
    { id: 4, name: 'Bananas', price: 100 },
    { id: 5, name: 'Tomatoes', price: 250 },
    { id: 6, name: 'Potatoes', price: 120 },
    { id: 7, name: 'Carrots', price: 180 },
    { id: 8, name: 'Strawberries', price: 400 },
    { id: 9, name: 'Blueberries', price: 350 },
    { id: 10, name: 'Cucumbers', price: 130 }
]

app.get('/', (req, res) => {
    res.send('This is the main page!')
})
app.get('/products', (req, res) => {
    res.json(products)
})
app.get('/products/:id', (req, res) => {
    const productID = parseInt(req.params.id);
    const product = products.find(p => p.id === productID);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'product not found' });
    }
})
app.get('/product/search', (req, res) => {
    const minprice = parseFloat(req.query.minPrice)
    const maxprice = parseFloat(req.query.maxPrice)
    const limit = parseInt(req.query.q)
    if (req.query.minPrice && isNaN(minprice)) {
        return res.status(400).json({ error: 'Invalid minPrice value' });
    }
    if (req.query.maxPrice && isNaN(maxprice)) {
        return res.status(400).json({ error: 'Invalid maxPrice value' });
    }
    if (req.query.q && (isNaN(limit) || limit < 1)) {
        return res.status(400).json({ error: 'Invalid limit value (q)' });
    }

    let filteredProducts = products.filter(p => {
        if (minprice !== null && p.price <= minprice) return false;
        if (maxprice !== null && p.price >= maxprice) return false;
        return true;
    });
    if (!isNaN(limit)) {
        filteredProducts = filteredProducts.slice(0, limit);
    }
    res.json(filteredProducts);
})
app.post('/product', (req, res) => {
    const { name, price } = req.body

    if (!name || typeof price !== 'number') {
        return res.status(400).json({ error: 'Please input a valid name and price' })
    }
    const newProduct = {
        id: products.length + 1,
        name,
        price
    }
    products.push(newProduct);
    res.status(201).json(newProduct)
})
app.put('/products/:id', (req, res) => {
    const productID = parseInt(req.params.id)
    const updatedData = req.body
    const product = products.find(p => p.id === productID)
    if (!product) {
        return res.status(404)({ error: "product does not exist" })
    }
    Object.assign(product, updatedData)
    res.json({ message: "product updated successfully", product })
})
app.delete('/products/:id', (req, res) => {
    const productID = parseInt(req.params.id)
    const productindex = products.findIndex(p => p.id === productID)
    if (productindex === -1) {
        return res.status(404).json({ error: "product not found" })
    }
    const deletedproduct = products.splice(productindex, 1)
    res.json({ message: "product deleted", product: deletedproduct })
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
