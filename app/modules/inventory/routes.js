var router = require('express').Router();

router.use('/users', require('./routes/users')) //path to users router file
router.use('/auth', require('./routes/auth')) //path to auth router file

// router.use(function(req, res, next) {
//     if (!req.route)
//         return next (new Error('404'));  
//     next();
// });

exports.inventory = router;