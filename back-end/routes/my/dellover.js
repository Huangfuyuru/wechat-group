const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {loverM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除爱人
//（点击删除爱人发送的是用户id，
//点击确认删除给接口发请求发送的是爱人id然后删除）
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data =  await loverM.findIdByUid(uid);
    res.json(data)
})

//确认删除
router.get('/confirm',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var loverid = Number(request.loverid);
    var result = await loverM.delLover(loverid);
    if(result == 0){
        var message = {code:0,msg:"删除爱人成功"}
    }else{
        var message = {code:1,msg:"删除爱人失败"}
    }
    res.json(message)
})

module.exports = router;