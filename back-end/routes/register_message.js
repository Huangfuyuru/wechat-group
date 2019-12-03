//注册详细信息后台
var express = require('express');
var router = express.Router();
var fs = require('fs');
var qs =require('querystring');
var bodyParser = require("body-parser");
var info ='' ;//后端返回给前端的数据
var passwd='';
var tel ='';
//引入数据库中的方法
var user =require('../database/dateMethod')


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


//匹配 /resign/message
router.get('/',async function(req,res,next){
    var html=fs.readFileSync('./testing-yxd/message.html').toString('utf8');
    res.writeHead(200,{
        'Content-Type':'text/html;charset=UTF8',
        'Content-Length':'Buffer.byteLength(html)'
    })

    res.end(html);
});

router.post('/',async function(req,res,next){
    
    console.log('message body',req.body);
    //暂存用户密码
    passwd =req.body.passwd;
    tel = req.body.tel;
    //进行验证码校验
    
    if(req.body.pass !==''){
        //格式正确的密码应该保存在哪
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

})

router.post('/identify',async function(req,res,next){
    console.log('tel:',tel,'passwd:',passwd);
    console.log('indetify',req.body);
    if(req.body.utel=== tel && req.body.pass === passwd){
        //图片上传还需要修改
        /*var person={
            name:req.body.uname,
            pass:req.body.pass,
            tel:req.body.utel,
            imgurl:req.body.uimage,
        }
        await user.userM.addUser(person);*/
        // var id = await  
        info={
            code:0,
            msg:'用户注册成功',
            // result:{id:}
        }
        res.send('注册成功');
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
    }
       
    

})


module.exports = router;
