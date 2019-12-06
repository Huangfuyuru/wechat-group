const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
const {userM} = require("../database/dateMethod");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',async function(req,res,next){
    console.log('hello')
    var tel = req.body.utel;
    var pass = req.body.pass;
    var data = await userM.login(tel,pass);
    if(data == 1){
        var message = {code:1,id:null}
    }else{
        var getId = data.id;
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



