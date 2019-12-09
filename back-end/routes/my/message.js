const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {userM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//消息反馈
router.post('/',async function(req,res,next){
    var userid = req.body.userid;
    var content = req.body.content;
    ////////////////********** */
    var result = await userM.changeById({
        uimage:uimage,
        uname:uname,
        pass:pass,
        uid:uid,
        gender:gender
    })
    if(result == 0){
        var message = {code:0,msg:"消息反馈成功"}
    }else{
        var message = {code:1,msg:"消息反馈失败"}
    }
    res.json(message)
    
})


module.exports = router;

