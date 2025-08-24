const express = require('express')
const mongoose = require('mongoose')
const { findByIdAndDelete, findOneAndDelete } = require('../taskmanager/models/task')

const app = express()
app.use(express.json())
const port = 5100
const MONGO_URI='mongodb://localhost:27017/taskdb'

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// error handeling middleware 
const errorHandler = fn => (req,res,next) => { Promise.resolve(fn(req,res,next)).catch(next)}

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    Email:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User',UserSchema)
//get all
app.get('/', errorHandler(async(req,res) => {
    const users = await User.find()
    res.json(users)
}))
app.post('/',errorHandler(async(req,res) => {
    const user = await User.create(req.body)
    res.status(201).json(user)
}))
//get by name 
app.get('/user/name',errorHandler (async(req,res) => {
    const {name} = req.query
    const userName = await User.findOne({name})
    if(!userName) {return res.status(404).json({message:'user not found'})}
    res.json(userName)
}))
//get by Email
app.get('/user/email',errorHandler( async (req,res) => {
    const {email} = req.query
    const user = await User.findOne({Email:email})
    if (!user){return res.status(404).json({message:' user not found'})}
    res.json(user)

}))
//get by name and email
app.get('/user', errorHandler(async (req, res) => {
  const { email, name } = req.query

  if (!email && !name) {
    return res.status(400).json({ message: 'Email or name is required' })
  }

  let user
  if (email) {
    user = await User.findOne({ Email: email })
  } else if (name) {
    user = await User.findOne({ name })
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
}))
// update email with name
app.put('/user/:name',errorHandler(async(req,res) =>{
    const {name} = req.params
    const newuserEmail = await User.findOneAndUpdate({name},req.body,{new:true})
    if(!newuserEmail){res.status(404).json({message:'user not found'})}
    res.json(newuserEmail)
}))
app.delete('/:date',errorHandler(async(req,res) => {
    const date = new Date(req.params.date)
    const user = await User.deleteMany({createdAt:{$lt:date}})
    if (user.deletedCount === 0){ 
        return res.status(404).json({message:`No users made before ${date} were found`})
    }
    res.json({message:`${user.deletedCount} were deleted`})
}))

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).json({error:'server error'})
})
app.listen(port,() => {
    console.log(`server is live on port ${port}`)
})




