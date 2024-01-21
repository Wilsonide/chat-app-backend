
const asyncHandler = require('express-async-handler');
const chatModel = require('../models/chatModel');
exports.createChat = asyncHandler(async(req,res)=>{
    
    const {firstID,secondID} =req.body;
    if (!firstID || !secondID){
        res.status(400);
        throw new Error('Provide two users');
    }
    const chat = await chatModel.findOne({members:{$all:[firstID,secondID]}});
    if (chat){
      res.status(200).json(chat);  
    }
    const newChat = chatModel.create({members:[firstID,secondID]});
    res.status(201).json(newChat);

});

exports.findUserChats = asyncHandler(async(req,res) => {
    const userId = req.params.userId;
    const chat = await chatModel.find({members:{$in:[userId]}});
    if (!chat) {
        res.status(404);
        throw new Error('No record');

    }
    res.status(200).json(chat);
})

exports.findChat = asyncHandler(async(req,res)=>{
    const {firstID, secondID} = req.params;
    const chat = await chatModel.findOne({members:{$all:[firstID, secondID]}});
    if(!chat){
        res.status(404);
        throw new Error('no record found');
    }
    res.status(200).json(chat);

})