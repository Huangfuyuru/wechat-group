const express = require('express'),
      router = express.Router(),
      url = require('url'),
      bodyParser = require("body-parser");
//引入数据库
const {userM} = require("../../database/dateMethod");

var info = {}
//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//消息反馈
router.post('/',async function(req,res,next){
    var uimage = req.body.uimage;
    // var uimage = JSON.parse(req.body.uimage);
    var uname = req.body.uname;
    var pass = req.body.pass;
    var uid = req.body.uid;
    var gender = req.body.gender;
    var id = req.body.id;
    console.log(id);
    console.log("uid",uid);
    var result = await userM.changeById(uid,{
        name:uname,
        imgurl:uimage,
        pass:pass,
        gender:gender
    })
    console.log(result);
    if(result === 0){
        //修改用户成功后需要给前端返回userM的修改后的信息
        info = {code:0,msg:"用户修改成功"}
        res.json(info)
    }else{
        info = {code:1,msg:"用户修改失败"}
        res.json(info)
    }
    var data = await userM.findById(uid);
    console.log("修改后的用户信息",data);
    //只是返回了结果
    // res.json(result)
})


module.exports = router;