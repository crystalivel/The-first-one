const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err))

const taskRoutes = require('./routes/task')
app.use('/api/task', taskRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port ${port}`))
