//注册后台
var express = require('express');
var router = express.Router();
var fs = require('fs');
var qs =require('querystring');
var bodyParser = require("body-parser");
var user =require('../database/dateMethod');
var info={} //后端返回给前端的信息
var passwd='';
var tel ='';

//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());


router.post('/confirm',async function(req,res,next){
    // console.log('req.body',req.body);
    // const data =await user.userM.findAll();
    // console.log(data.tel);

    //可以注册返回1，不存在数据库中   
    var eTel = await user.userM.findTel(req.body.tel);
    console.log(eTel);
 
    //判断用户电话是否在DB中，若在不让注册，不在可以
    if(eTel === 1){ 
        //触发发送短信接口发送验证码
        //由于现在尚不能短信接口，则验证码输入什么都对
        info={
            code:0,
            msg:'验证码以成功发送，2分钟内有效'
        }
    }else{
        info={
            code:1,
            msg:'该用户电话已经注册过',
        }
    }
    res.json(info);

});

router.post('/', async function(req,res,next){
    passwd =req.body.passwd;
    tel = req.body.tel;
    
    //进行验证码校验
    if(req.body.pass !==''){
        info={
            code:0,
            msg:'验证码正确'
        }
        res.json(info);
    }else{
        info={
            code:1,
            msg:'验证码错误，请重新输入',
        }
        res.json(info);
    }

});


router.post('/message',async function(req,res,next){
    console.log('body',req.body);
    // console.log('tel',tel);
    // console.log('passwd',passwd);



    if(req.body.utel=== tel && req.body.pass === passwd){
        //图片上传还需要修改
        var person={
            name:req.body.uname,
            pass:req.body.pass,
            tel:req.body.utel,
            imgurl:req.body.uimage,
        }
        // await user.userM.addUser(person);
         
        info={
            code:0,
            msg:'用户注册成功',
        }
        res.json(info);
    }else if(req.body.pass !== passwd){
        info={
            code:1,
            msg:'密码与上一次输入的不一致，请重新输入'
        }
        res.json(info);
    }else if(req.body.utel !== tel){
        info={
            code:2,
            msg:'电话与上一次输入的不一致，请重新输入'
        }
        res.json(info);
    }
});
module.exports = router;
