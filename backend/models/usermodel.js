const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/docs')
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