const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {loverM} = require("../../database/dateMethod");

var info ={};//返回给前端的数据

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击增加爱人
// 爱人name，关系确认日期ldate，性别gender，用户uid
router.post('/',async function(req,res,next){
    console.log(req.body);
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
    if(result === 0){
        var data =await loverM.findById(uid)
        info = {code:0,msg:"添加爱人成功"}
        console.log('添加爱人后查看所有信息',await loverM.findAll());
        res.json(data)
    }else{
        info = {code:1,msg:"添加爱人失败"}
    }
    
})

module.exports = router;
