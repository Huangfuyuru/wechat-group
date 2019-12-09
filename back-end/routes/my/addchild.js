const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {childM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击增加亲子
// router.get('/',async function(req,rea,next){
//     var request = qs.parse(url.parse(req.url).query);
//     var childsid = Number(request.childsid);
//     var data = await childM.findById
// })

//增加亲子
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
    if(result == 0){
        var message = {code:0,msg:"添加亲子成功"}
    }else{
        var message = {code:1,msg:"添加亲子失败"}
    }
    res.json(message)
})

module.exports = router;