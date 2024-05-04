var router = require('express').Router();

router.use('/', router.get("/", (req, res) => {
  res.send("DEFAULT LANDING");
}));

router.use(function(req, res, next) {
    if (!req.route)
        return next (new Error('404'));  
    next();
});

router.use(function(err, req, res, next){
    res.send(err.message);
})

router.use(function(req, res){
    res.send(router.locals.test + '');
});
exports.index = router;