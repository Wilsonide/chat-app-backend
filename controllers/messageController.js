const asyncHandler = require('express-async-handler');
const { response } = require('express');
const messageModel = require('../models/messageModel');
exports.createMessage = asyncHandler(async(req,res)=>{
    const {chatId,senderId,text} = req.body;
    if(!chatId || !senderId || !text){
        res.status(400);
        throw new Error('All fields are required');
    }
    const message = await messageModel.create({
        chatId,
        senderId,
        text,
    })
    res.status(201).json(message);
})

exports.getMessages = asyncHandler(async(req, res)=>{
    const {chatId} = req.params;
    messages = await messageModel.find({chatId});
    if(!messages){
        res.status(404);
        throw new Error('no messages found');
    }
    res.status(200).json(messages);
    
})