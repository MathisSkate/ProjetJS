var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("---------");
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
    console.log("---------");
    
    res.redirect("/");
});


module.exports = router;