const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childAdolesceM} = require("../../database/dateMethod");//引入数据库

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击大事记
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childAdolesceM.findByCid(childsid);
    console.log(data)
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
        
    }
    
})

//增加大事
router.post('/ccevents',async function(req,res,next){
    var childsid = req.body.cid;
    var item = req.body.item;
    var name = req.body.name;
    var imgurl = req.body.imgurl;
    var content = req.body.content;
    var setdate = req.body.setdate;
    // console.log(item,imgurl)
    await childAdolesceM.addChildAdolesce({
        item:item,
        imgurl:imgurl,
        content:content,
        cid:childsid,
        name:name,
        setdate:setdate
    })
    var data = await childAdolesceM.findByCid(childsid);
    if(data == 1){
        var message={code:1,msg:"添加失败"};
        console.log('添加失败')
    }else{
        var message={code:0,msg:"添加成功"};
        console.log('添加失败')
    }
    res.json(message);
})

//删除大事
router.get('/crevents',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childAdolesceid = Number(request.childAdolesceid);
    await childAdolesceM.delChildAdolesce(childAdolesceid);
    var data = await childAdolesceM.findByCid(childsid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
        
    }
})
module.exports = router;