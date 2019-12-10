const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {childM} = require("../../database/dateMethod");

var info = {};

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击增加亲子
//亲子name，出生日期birthday，性别gender，用户uid
router.post('/',async function(req,res,next){
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var uid = req.body.uid;
    var result = await childM.addChild({
        name:name,
        birthday:birthday,
        gender:gender,
        uid:uid
    })
    if(result === 0){
        var data = await childM.findById(uid);
        info = {code:0,msg:data}
        console.log('添加亲子后查看所有信息',await childM.findAll();
        res.json(data)

    }else{
        info = {code:1,msg:"添加亲子失败"}
    }
    
})

module.exports = router;