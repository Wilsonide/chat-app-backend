const express = require('express');
const { createChat, findUserChats, findChat } = require('../controllers/chatController');
const router = express.Router();
 
router.route('/').post(createChat);
router.route('/:userId').get(findUserChats);
router.route('/find/:firstID/:secondID').get(findChat);


module.exports = router;