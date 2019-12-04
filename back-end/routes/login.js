const express = require('express');
const router = express.Router();
// var User = require('../models/users');
const bodyParser = require("body-parser");
var dM = require('../database/dateMethod');


//此中中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());

router.get ('/',function(req,res){
    //获取用户提交信息  电话 密码
        res.render('routes/login');

    })
router.route ('/doLogin').get( function(req,res){
    res.render('login',{title :'登录'})
}).post(function(req,res){
    var tel = req.body.tel;
    var pwd = req.body.pwd;
    var result = dM[15].findTel(tel);
    if(result == 0){
        var ifLogin = dM[15].login(tel,pwd);
        if(ifLogin==1){
            res.send(500);
            console.log("密码错误");
        }else{
            res.send(result);
        }
    }else{
        req.send(404);
        console.log("用户电话不存在");
    }
})
   
// 模块化 暴露模块 
module.exports = router;
