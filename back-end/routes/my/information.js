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
    var result = await userM.changeById(id,{
        image:uimage,
        name:uname,
        pass:pass,
        id:uid,
        gender:gender
    })
    //返回图片信息
    console.log(image);
    //返回修改的结果
    console.log(result);
    if(result === 0){
        //修改用户成功后需要给前端返回userM的修改后的信息
        //
        var data  = await userM.findById(id)
        info = {code:0,msg:"用户修改成功"}
        res.json(data)
    }else{
        info = {code:1,msg:"用户修改失败"}
        res.json(info)
    }
    //只是返回了结果
    // res.json(result)
})


module.exports = router;