var router = require('express').Router();

router.use('/category', require('./routes/category')) //path to category router file
router.use('/users', require('./routes/users')) //path to users router file
router.use('/auth', require('./routes/auth')) //path to auth router file
router.use('/product', require('./routes/product')) //path to product router file

exports.inventory = router;