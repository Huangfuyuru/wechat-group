//注册后台
var express = require('express');
var router = express.Router();
var fs = require('fs');
var qs =require('querystring');
var bodyParser = require("body-parser");
var user =require('../database/dateMethod');
var info={} //后端返回给前端的信息

//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());


//匹配 /menus/resign
router.get('/',function(req,res){
    var html=fs.readFileSync('./testing-yxd/yangxindi.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    })

    res.end(html);
});


//验证码
router.get('/testing',function(req,res){
    
});

//点击发送验证码按钮post数据，但是yangxindi.html中未再写前端代码测试
router.post('/testing',async function(req,res,next){

    var eTel = await user.userM.findTel(req.body.tel);
    console.log(eTel);
    //不存在返回0
    
    //判断用户电话是否在DB中，若在不让注册，不在可以
    if(eTel === 0){ 
        //触发发送短信接口发送验证码
        //由于现在尚不能短信接口，则验证码输入什么都对

        
        //告诉前端验证码已成功发送
        info={
            code:0,
            msg:'验证码以成功发送，2分钟内有效'
        }
    }
    else{
        var info={
            code:1,
            msg:'该用户电话已经注册过',
            result:{}//？有用吗
        }
        res.json(info); //前端提示用户
    }
   
});

module.exports = router;
