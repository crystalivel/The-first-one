const express = require('express')
const {MongoClient} = require("mongodb")


const app = express()
app.use(express.json())

const uri = "mongodb://localhost:27017"
const port = 5100
const dbName = "mydb"

const client = new MongoClient(uri)


async function startTheSever() {
    try{
        await client.connect()
        console.log('connected to server')
        const db = client.db(dbName)
        const usersCollection = db.collection("users")

        app.post('/', async (req,res) => {
         try {
            const result = await usersCollection.insertOne(req.body)
            res.status(201).json({
                message:"user created successfully",
                userId: result.insertedId
            })
         } catch(err){
            res.status(500).json({error:err.message})
         }
        })
        app.get('/', async(req,res) => {
            try{
                const users = await usersCollection.find().toArray()
                res.json(users)
            }catch(err){
                res.status(500).json({error:err.message})
            }
        })
        app.listen(port,() => console.log(`server is running on port ${port}`))

    }catch (err){
        console.error(`failed to connect to mongo ${err}`)
        process.exit(1)
    }
}

startTheSever()