const express = require('express');
const router = express.Router();
var fs = require('fs');
const bodyParser = require("body-parser");
var dM = require('../database/dateMethod');
var info = {}//后端返回给前端的信息

//此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());

router.get ('/',function(req,res){
    //需要补充写一个html  像昕迪的一样
        res.render('routes/login');


    })

router.route ('/').get( function(req,res){
    res.render('login',{title :'登录'})
}).post(async function(req,res){
    var tel = req.body.tel;
    var pwd = req.body.pwd;
    var result = dM[15].findTel(tel);
    if(result == 0){
        var ifLogin = dM[15].login(tel,pwd);
        if(ifLogin==1){
            info = {
                code : 1,
                msg :'用户名或密码错误' //密码错误
            }
            res.json(info);
        }else{
            res.send(result);
        }
    }else{
        info={
            code:0,
            msg:'用户名或密码错误' //用户电话不存在
        }
        res.json(info);
    }
})
   
// 模块化 暴露模块 
module.exports = router;
 