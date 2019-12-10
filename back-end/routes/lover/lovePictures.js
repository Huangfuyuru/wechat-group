const express = require('express'),
      app = express(),
      router = express.Router(),
      bodyParser = require("body-parser"),
      lover = require('../database/dateMethod');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/',function(req,res,next){
    var lid = req.query.loverid;

})


module.exports = router;