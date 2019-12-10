const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {loverM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击增加爱人
// 爱人name，关系确认日期ldate，性别gender，用户uid
router.post('/',async function(req,res,next){
    var name = req.body.name;
    var ldate = req.body.ldate;
    var gender = req.body.gender;
    var uid = req.body.uid;
    var result = await loverM.addLover({
        name:name,
        ldate:ldate,
        gender:gender,
        uid:uid
    })
    if(result !== 1){
        var message = {code:0,msg:"添加爱人成功"}
    }else{
        var message = {code:1,msg:"添加爱人失败"}
    }
    res.json(message)
})

module.exports = router;
