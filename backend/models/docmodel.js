const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/docs')
const docSchema = new mongoose.Schema({
    title:String,
    uploadedBy:String,
    content:{
        type:String,
        default:"",
    },
    date:{
        type:Date,
        default:Date.now
    },
    lastupdate:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Doc',docSchema)