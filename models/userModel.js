const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {type: 'string',required: true,minlength:3,maxlength:30},
    email: {type: 'string',required: true,minlength:3,maxlength:160,unique: true},
    password: {type: 'string',required: true,minlength:3,maxlength:1024}
}
,{timestamps:true})

userModel = mongoose.model('User', schema)
module.exports = userModel