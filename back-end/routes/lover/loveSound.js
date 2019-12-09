const express = require('express'),
      app = express(),
      router = express.Router(),
      qs =require('querystring'),
      bodyParser = require("body-parser"),
      user =require('../database/dateMethod'),
      info={} //后端返回给前端的信息

router.get('/',function(req,res,next){
    res.end('hello loveSound');
})


router.get('/lsound',async function(req,res,next){
    lid = req.query.id;
    console.log(lid);
})

module.exports = router;