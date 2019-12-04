const express = require('express');
const router = express.Router();
// const URL  =  require('url');
const dM = require('../database/dateMethod');

router.get('/',function(req,res){
    var url = document.location.toString();//获取URL地址
    var urlParmStr = url.slice(url.indexOf('?')+1);//获取问号后所以的字符串
    var arr = urlParmStr.split('&');//通过&符合将字符串分割转成数组
    var childsid = arr[0].split('=')[1];//获取数组中第一个参数
    var data  = dM[2].findByCid(childsid);
    console.log(data);
    res.send(data)
})
router.get('/ccgrowup',function(req,res){
    res.end('add')
})
router.get('/',function(req,res){
    res.end('add')
})
module.exports = router;