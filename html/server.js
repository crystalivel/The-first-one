const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

port = 5100
const app = express()

//middelware 
app.use(express.urlencoded)