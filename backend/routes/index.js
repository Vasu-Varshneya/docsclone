var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var usermodel = require('../models/usermodel');
var jwt = require('jsonwebtoken');
var docmodel = require('../models/docmodel')
const secret = 'secret'
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup', async (req, res) => {
  console.log("called")
  let { username, name, email, phone, password } = req.body;
  let emaildup = await usermodel.findOne({ email: email })
  let phonedup = await usermodel.findOne({ phone: phone })
  if (emaildup) {
    return res.json({ message: 'Email already exists' })
  }
  else if (phonedup) {
    return res.json({ message: 'Phone no already exists' })
  }
  else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        let user = await usermodel.create({
          username: username,
          name: name,
          email: email,
          phone: phone,
          password: hash
        })
        return res.json({ success: true, message: "User created successfully", userId: user._id })
      });
    });
  }
})
router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  let user = await usermodel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email: user.email, userId: user.userId }, secret);
        return res.json({ success: true, message: "Login successfully", userId: user._id, token: token })
      }
      else {
        return res.json({ success: false, message: 'Invalid  password' })
      }
    })
  }
  else {
    return res.json({ success: false, message: 'User not found' })
  }

})
router.post('/createDoc', async (req, res) => {
  let { userId, docName } = req.body;
  let user = usermodel.findById(userId);
  if (user) {
    let doc = await docmodel.create({
      uploadedBy: userId,
      title: docName,
    })
    return res.json({ success: true, message: "Document created successfully", docid: doc._id })
  }
  else {
    return res.json({ success: false, message: "Invalid User" });
  }
})
router.post('/uploadDoc', async (req, res) => {
  let { userId, docId, content } = req.body;
  let user = docmodel.findById(userId)
  if (user) {
    let doc = await docmodel.findByIdAndUpdate(docId, { content: content });
    return res.json({ success: true, message: "Document uploaded successfully" })
  }
  else {
    return res.json({ success: false, message: "Invalid user" })
  }
})
router.post('/getdoc', async (req, res) => {
  let { docId, userId } = req.body;
  let user = await usermodel.findById(userId)
  if (user) {
    let doc = await docmodel.findById(docId)
    if (doc) {
      return res.json({ success: true, message: "Document successfully founded", doc: doc })
    }
    else {
      return res.json({ success: false, message: "Document does not exist." })
    }
  }
  else {
    return res.json({ success: false, message: "User does not exist" })
  }
})
router.post('/deletedoc', async (req,res) => {
  let { docId, userId } = req.body;
  let user = await usermodel.findById(userId)
  if (user) {
    let doc = await docmodel.findByIdAndDelete(docId)
    return res.json({ success: true, message: "Document deleted successfully." }) 
  }
  else {
    return res.json({ success: false, message: "Invalid User." })
  }
})
router.post('/getAlldocs',async(req,res)=>{
  let {userId} = req.body;
  let user = await usermodel.findById(userId);
  if(user){
    let doc = await docmodel.find({uploadedBy:userId});
    return res.json({success:true,message:"Document fetched successfully.",doc:doc})
  }
  else{
    return res.json({success:false,message:"Invalid User."})
  }
})
router.post('/logout',async(req,res)=>{
  let {userId} = req.body;
  let user = await usermodel.findById(userId);
  if(user){
    return res.json({success:true,message:'User logged out successfully.'})
  }
  else{
    return res.json({success:false,message:'Invalid User'})
  }
})
module.exports = router;
