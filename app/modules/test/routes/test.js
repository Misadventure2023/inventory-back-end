
const express = require('express');
const router = express.Router();
const { test } = require('../controller/test') //call test controller and functions

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
// Test Routes
//================

router.get('/test-api', test)

module.exports = router;

