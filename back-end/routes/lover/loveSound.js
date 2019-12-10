const express = require('express'),
      app = express(),
      router = express.Router(),
      qs =require('querystring'),
      bodyParser = require("body-parser"),
      lover =require('../../database/dateMethod');
var info={}; //后端返回给前端的信息

router.get('/',async function(req,res,next){
    var id = req.query.loverid;
    console.log('sound query',req.query);
    var data =await lover.loverDiaryM.findByPid(id);
    if(data !== 1){
        info ={
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info ={
            code:1,
            msg:'传入的爱人lid有误'
        }
    }
})

//增加语音
// router.post('/lcsound',async function(req,res,next){

// })


module.exports = router;