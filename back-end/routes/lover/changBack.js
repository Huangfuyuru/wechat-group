const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      lover =require('../../database/dateMethod');
var info={}; //后端返回给前端的信息

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// 更换背景照片

router.get('/',async function(req,res,next){
    var lid = req.query.loverid,
        backround=req.query.backround;
    var text = {
        id:lid,
        background:backround
    }
    var data = await lover.loverBackgroundM.changeByid(text);
    if(data === 0 ){
        info={
            code:0,
            msg:'更换背景成功'
        }
        res.json(info);
    }else{
        info= {
            code:1,
            msg:'更换背景失败'
        }
        res.json(info);

    }
    
});

module.exports = router;