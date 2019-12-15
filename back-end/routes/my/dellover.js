const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {loverM,loveListM,loverDiaryM,loverPhotoM,loverImpDateM,loverPhotoListM,loverVoiceM} = require("../../database/dateMethod");

var info = {}
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
    var loverPhotoListid = loverPhotoListM.findIdByLid(loverid);
    var result1 = await loveListM.delAllByLid(loverid);
    var result2 = await loverDiaryM.delAllByLid(loverid);
    var result3 = await loverImpDateM.delAllByLid(loverid);
    var result4 = await loverPhotoListM.delAllByLid(loverid);
    var result5 = await loverVoiceM.delAllByLid(loverid);
    var result6 = await loverPhotoM.delAllByPid(loverPhotoListid); //删除所有照片
    var result7 = await loverPhotoListM.delLoverPhotoList(loverPhotoListid); //删除相册
    if(result6 === 0){
        if(result7 === 0 ){
            if(result1 === 0 && result2 === 0 && result3 === 0 && result4 === 0 && result5 === 0){
                var result = await loverM.delLover(loverid);
                if(result === 0){
                    var data = await loverM.findById(uid)
                    info = {code:0,msg:"删除爱人成功"}
                    res.json(data)
                }else{
                    info = {code:1,msg:"删除爱人失败"}
                }
            }
        }
    }
    
})

module.exports = router;