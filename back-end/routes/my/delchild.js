const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {childM,childAdolesceM,childDiaryM,childGrowM,childPhotoM,childPhotoListM,childVoiceM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除亲子
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data =  await childM.findIdByUid(uid);
    res.json(data)
})

//确认删除
router.get('/confirm',async function(req,res,next){
    
})

module.exports = router;