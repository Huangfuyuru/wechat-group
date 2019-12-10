const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url');
const {lover} = require('../../database/dateMethod');//引入数据库

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
            code=0,
            msg:'更换背景成功'
        }
        res.json(info);
    }else{
        info= {
            code:1,
            msg:'更换背景失败'
        }
    }
    
});