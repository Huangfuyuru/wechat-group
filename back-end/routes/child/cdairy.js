const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childDiaryM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击日记
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childDiaryM.findByCid(childsid);
    res.json(data)
})

//增加日记
router.post('/ccdairy',async function(req,res,next){
    var childsid = req.body.childsid
    var name = req.body.name;
    var content = req.body.content;
    var imgurl = req.body.imgurl;
    await childDiaryM.addChildDiary({
        name:name,
        content:content,
        imgurl:imgurl,
        cid:childsid
    });
    var data = await childDiaryM.findByCid(childsid);
    res.json(data)
})

//删除日记
router.get('/crdairy',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childDiaryid = Number(request.childDiaryid);
    await childDiaryM.delChildDiary(childDiaryid);
    var data = await childDiaryM.findByCid(childsid);
    res.json(data)
})
module.exports = router;