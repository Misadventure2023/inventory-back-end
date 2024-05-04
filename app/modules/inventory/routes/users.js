
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controller/users') //call test controller and functions

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
// Users Routes
//================

router.get('/get', getUsers)
router.post('/create', createUser)

module.exports = router;

