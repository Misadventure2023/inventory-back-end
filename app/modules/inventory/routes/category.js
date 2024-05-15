
const express = require('express');
const router = express.Router();
const { getCategory, createCategory, deleteCategory, updateCategory, searchCategory } = require('../controller/category') //call category controller and functions

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
// Category Routes
//================

router.get('/get', getCategory)
router.post('/create', createCategory)
router.delete('/delete', deleteCategory)
router.post('/update', updateCategory)
router.post('/search', searchCategory)

module.exports = router;

