
const express = require('express');
const router = express.Router();
const { login } = require('../controller/auth') //call auth controller and functions

//set routes and functions
//        .get/post/put/delete    
//         |
//         |   routePath
//         |    |
//         |    |    functionName from controller
//         |    |     |
//         v    v     v
// router.get('/', fetch)

//================
// Auth Routes
//================

router.post('/login', login)

module.exports = router;

