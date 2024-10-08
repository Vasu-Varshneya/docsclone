const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://vasuvarshney26:Vfck93ZrLXTfAr1M@cluster0.p91z5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const UserSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    phone:String,
    email:String,
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false

    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('User',UserSchema)
