const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      {childM} = require('../../database/dateMethod');//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//更改图片
router.post('/',async function(req,res,next){
    var childsid = Number(req.body.childsid);
    var imgurl = req.body.background;
    console.log("childsid",childsid);
    console.log("imgurl",imgurl)
    var data = await childM.changeBackGroundById({
        id:childsid,
        background:imgurl
    });
    console.log(data)
    res.json({code:data})
})

module.exports = router;