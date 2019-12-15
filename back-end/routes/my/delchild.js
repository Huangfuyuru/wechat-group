const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {childM,childAdolesceM,childDiaryM,childGrowM,childPhotoM,childPhotoListM,childVoiceM} = require("../../database/dateMethod");
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
    var childid = Number(request.id);
    console.log(childid);
    var childPhotoListid = childPhotoM.findIdByPid(childid);
    console.log(childPhotoListid);
    console.log('dfdf')
    var result1 = await childAdolesceM.delAllByCid(childid);
    var result2 = await childDiaryM.delAllByCid(childid);
    var result3 = await childPhotoListM.delAllByCid(childid);
    var result4 = await childVoiceM.delAllByCid(childid);
    var result5 = await childGrowM.delAllByCid(childid);
    var result6 = await childPhotoM.delAllByPid(childPhotoListid); //删除所有照片
    var result7 = await childPhotoListM.delChildPhotoList(childPhotoListid); //删除相册
    // if(result6 === 0){ //删除该相册中所有照片
        console.log('删除照片成功')
        // if(result7 === 0){ //删除相册
            if(result1 === 0 && result2 === 0 && result3 === 0 && result4 === 0 && result5 === 0){
                var result = await childM.delChild(childid);
                if(result === 0){
                    var data = await childM.findById(uid)
                    info = {code:0,msg:"删除亲子id成功"}
                    res.json(data)
                }else{
                    info = {code:1,msg:"删除亲子id失败"}
                    res.json(info)
                }
            }else{
                info = {msg:"删除亲子内容失败"}
                res.json(info)
            }
        // }
    // }
    
})

module.exports = router;