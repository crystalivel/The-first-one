const express = require('express');
const app = express();

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.listen(3000, () => {});