const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childGrowM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击成长记录
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childGrowM.findByCid(childsid);
    res.json(data)
})

//增加成长记录
router.post('/ccgrowup',async function(req,res,next){
    var childsid = req.body.childsid;
    var length = req.body.length;
    var weight = req.body.weight;
    var age = req.body.age;
    await childGrowM.addChildGrow({
        weight:weight,
        length:length,
        age:age,
        cid:childsid
    })
    var data = await childGrowM.findByCid(childsid);
    res.json(data)
})

//删除成长记录
router.get('/crgrowup',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childGrowid = Number(request.childGrowid);
    await childGrowM.delChildGrow(childGrowid);
    var data = await childGrowM.findByCid(childsid);
    res.json(data)
})

module.exports = router;