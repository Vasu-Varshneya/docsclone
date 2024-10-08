const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vasuvarshney26:Vfck93ZrLXTfAr1M@cluster0.p91z5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
