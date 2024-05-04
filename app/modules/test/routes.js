var router = require('express').Router();

router.use('/test-module', require('./routes/test')) //path to product router file

// router.use(function(req, res, next) {
//     if (!req.route)
//         return next (new Error('404'));  
//     next();
// });

exports.test = router;