const express = require('express'), 
      router = express.Router(),
      bodyParser = require("body-parser"),
      session = require('express-session'),
      fs = require('fs');
// const URL  =  require('url');
//??
const {childGrowM} = require('../../database/dateMethod');


//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//配置 express-session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge:1000*60*30
    },
    rolling:true
}))

router.post('/',function(req,res){
    var url = document.location.toString();//获取URL地址
    var urlParmStr = url.slice(url.indexOf('?')+1);//获取问号后所以的字符串
    var arr = urlParmStr.split('&');//通过&符合将字符串分割转成数组
    var childsid = arr[0].split('=')[1];//获取数组中第一个参数
    var data  = childGrowM.findByCid(childsid);
    if(data == 1){
        var message = {code:1,id:null}
    }else{
        var getChildGrowid = data.childGrowid;
        var getLength = data.length;
        var getWeight= data.weight;
        var getAge = data.age;
        var getSetdate = data.setdate;

        var message = {code:0,childGrowid:getChildGrowid,length:getLength,weight:getWeight,age:getAge,setdate:getSetdate}
    }
    //保存用户信息
    session.userinfo = data;
    res.json(message)
})
router.post('/ccgrowup',function(req,res){

    res.end('add')
})
router.post('/',async function(req,res){
    
    res.end('add')
})
router.post('/',async function(req,res){
    res.end('add')
})

//测试
router.get('/',function(req,res,next){ 
    var html=fs.readFileSync('./testing-lmy/cgrowup.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    })

    res.end(html);
})
module.exports = router;0