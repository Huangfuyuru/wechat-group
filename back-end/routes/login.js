const express = require('express'),
      app = express(),
      router = express.Router(),
      session = require('express-session'),
      bodyParser = require("body-parser");
const {userM} = require("../database/dateMethod");//引入数据库
const fs = require('fs');
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

router.post('/',async function(req,res,next){
    var tel = req.body.utel;
    var pass = req.body.pass;
    var data = await userM.login(tel,pass);
    if(data == 1){
        var message = {code:1,id:null}
    }else{
        var getId = data.id;

        //保存用户信息
        session.userinfo = data;
        var message = {code:0,id:getId}
    }
    res.json(message)
})

//测试
// router.get('/',function(req,res,next){ 
//     var fileContent = fs.readFileSync(`E:\\fight_blink\\wechat-group\\back-end\\app-hf.html`);
//     res.writeHead(200, {"Content-Type":"text/html"});
//     res.end(fileContent);
// })

module.exports = router;



