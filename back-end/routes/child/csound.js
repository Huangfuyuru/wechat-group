const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser"),
      {childVoiceM} = require('../../database/dateMethod');


//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/',function(req,res,next){
    res.end('/child/csound')
})

module.exports = router;