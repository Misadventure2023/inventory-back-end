
const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser } = require('../controller/users') //call test controller and functions

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
router.delete('/delete', deleteUser)

module.exports = router;

