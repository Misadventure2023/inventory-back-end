
const express = require('express');
const router = express.Router();
const { getProduct, createProduct, deleteProduct, updateProduct, searchProduct } = require('../controller/product') //call category controller and functions

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
// Product Routes
//================

router.get('/get', getProduct)
router.post('/create', createProduct)
router.delete('/delete', deleteProduct)
router.post('/update', updateProduct)
router.post('/search', searchProduct)

module.exports = router;

