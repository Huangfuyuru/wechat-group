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

    var text={
        name:'一起看日出日落',
        content:'看日出日落',
        imgurl:'#',
        local:'石家庄',
        listid:'2500002',
        lid:lid,
        setdate:'2019-5-20'
        
    }
    var data1 = await lover.loveListM.addLoveList(text);
    console.log(data1);
    res.json(data);
})

router.get('/list',async function(req,res,next){
    console.log('点击所有清单',req.query);

    var data = await lover.loveListM.findByLid(lid);
    var data1 = await lover.listM.findAll();
    var arr=[];
    console.log(typeof data);
    // if(data === 1){
    //     info={code:0,msg:null};
    // }else{
    //     info={code:0,msg:data};
    // }

})
module.exports = router;