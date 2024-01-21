const express = require('express');
const { registerUser, loginUser, findUser } = require('../controllers/UserController');
const router = express.Router();



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/find/:userId').get(findUser);

module.exports = router;
