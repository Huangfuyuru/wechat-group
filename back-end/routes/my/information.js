const express = require('express'),
      router = express.Router(),
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
    var uname = req.body.uname;
    var pass = req.body.pass;
    var uid = req.body.uid;
    var gender = req.body.gender;
    var id = req.body.id;

    console.log('req.body',req.body)
    var result = await userM.changeById(id,{
        uimage:uimage,
        uname:uname,
        pass:pass,
        uid:uid,
        gender:gender
    })
    console.log('----------------------------------')
    console.log(result)
    // res.json({message:'success'})
    if(result === 0){
        //修改用户成功后需要给前端返回userM的修改后的信息
        //目前返回的是所用户的信息  肯定是不行的！
        // var data  = await userM.findAll()
        info = {code:0,msg:"用户修改成功"}
        res.json(info)
    }else{
        info = {code:1,msg:"用户修改失败"}
        res.json(info)
    }
    // 只是返回了结果
    // res.json(result)
})


module.exports = router;