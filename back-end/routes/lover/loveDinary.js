const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    fs = require('fs');
    lover = require('../../database/dateMethod');


//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());

// 匹配 /lover/ldairy

router.get('/',async function(req,res,next){

    var id = req.query.loverid;
    console.log(id);
    var data =await lover.loverDiaryM.findByPid(id);
    console.log(data);
});
module.exports = router;