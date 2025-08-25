const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        min: 0,
        required:true,
        get: (v) => `$${v}`
    },
    description:{
       type: String
    },
    inStock:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}
)
module.exports = mongoose.model('Product',ProductSchema)