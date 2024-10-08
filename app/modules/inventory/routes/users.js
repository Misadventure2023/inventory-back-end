
const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser, updateUser, searchUser } = require('../controller/users') //call test controller and functions

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
router.post('/update', updateUser)
router.post('/search', searchUser)

module.exports = router;

