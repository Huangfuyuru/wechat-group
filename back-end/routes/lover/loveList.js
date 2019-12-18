const express = require('express'),
      app = express(),
      bodyParser = require("body-parser"),
      lover =require('../../database/dateMethod'),
      router = express.Router();

var info={};

router.get('/',async function(req,res,next){
    
    console.log('点击清单',req.query);
    var lid = req.query.loverid;
    var data = await lover.loveListM.findByLid(lid);
    if(data === 1){
        info={code:0,msg:null};
    }else{
        info={code:0,msg:data};
    }
    res.json(data);

    // var text={
    //     name:'一起看日出日落',
    //     content:'看日出日落',
    //     imgurl:'#',
    //     local:'石家庄',
    //     lid:lid
        
    // }
    // var data1 = await lover.loveListM.addLoveList(text);
    // console.log(data1);
})

router.get('/list',async function(req,res,next){
    console.log('点击所有清单',req.query);
    var lid = req.query.loverid;
    var data = await lover.loveListM.findByLid(lid);
    var data1 = await lover.listM.findAll();
    var newdata={};
    // console.log(typeof data1);
    // console.log(data1);
    if(data === 1){
        Object.assign(newdata,null,data1);
        console.log('newdata',newdata);
    }
})
module.exports = router;