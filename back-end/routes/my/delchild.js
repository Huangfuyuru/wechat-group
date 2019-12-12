const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
//引入数据库
const {childM,childAdolesceM,childDiaryM,childPhotoListM,childVoiceM} = require("../../database/dateMethod");
var info = {}

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除亲子
// （点击删除亲子发送的是用户id可以选择哪个亲子，
// 点击确认删除给接口发请求发送的是亲子id然后删除）
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data =  await childM.findIdByUid(uid);
    res.json(data)
})

//确认删除
router.get('/confirm',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childid = Number(request.childid);
    var result1 = await childAdolesceM(childid);
    var result2 = await childDiaryM(childid);
    var result3 = await childPhotoListM(childid);
    var result4 = await childVoiceM(childid);
    if(result1 === 0 && result2 === 0 && result3 === 0 && result4 === 0){
        var result = await childM.delChild(childid);
        if(result === 0){
            var data = await childM.findById(uid)
            info = {code:0,msg:"删除亲子id成功"}
            res.json(data)
        }else{
            info = {code:1,msg:"删除亲子id失败"}
        }
    }else{
        info = {msg:"删除亲子内容失败"}
    }
    
    
})

module.exports = router;