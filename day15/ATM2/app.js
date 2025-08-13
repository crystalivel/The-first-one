require('dotenv').config();

const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express();
const Port = 3000;

app.use(express.static('public'));

//templeting engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');

app.use('/', require ('./server/routes/main'))


app.listen(Port, () => {
    console.log(`listening on Port ${Port}`)
})