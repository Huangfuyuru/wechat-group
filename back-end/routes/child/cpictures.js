const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser"),
      {childPhotoListM,childPhotoM} = require('../../database/dateMethod');

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//点击云相册
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var data = await childPhotoListM.findByCid(childsid);
    if(data == 1){
        res.json(null)
    }else{
        res.json(data);
    }
    
})

//点击具体相册
router.get('/show',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childPhotoListid = Number(request.childPhotoListid);
    var data = await childPhotoM.findByPid(childPhotoListid);
    res.json(data)
})

//增加相册
router.get('/ccpictures',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var background = request.background;
    var name = request.name;
    var data = await childPhotoListM.addChildPhotoList({name:name,cid:childsid,background:background});
    if(data == 1){
        res.json({code:1,msg:"创建失败"})
    }else{
        res.json({code:0,msg:"创建成功"})
    }
})

//删除相册
router.get('/crpictures',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var childPhotoListid = request.childPhotoListid;
    var delallphoto = await childPhotoM.delAllByPid(childPhotoListid);
    var delphotolist = await childPhotoListM.delChildPhotoList(childPhotoListid);
    var data = await childPhotoListM.findByCid(childsid);
    if(delallphoto==1 || delphotolist == 1){
        res.json(null)
    }else{
        res.json(data)
    }
    
})


//增加照片
router.post('/caddpictures',async function(req,res,next){
    childPhotoListid = req.body.childPhotoListid;
    imgurl = req.body.imgurl;
    imgurl.map(async function(item){
        await childPhotoM.addChildPhoto({imgurl:item,pid:childPhotoListid})
    })
    var data = await childPhotoM.findByPid(childPhotoListid);
    res.json(data)
})

//删除照片
router.post('/cdelpictures',async function(req,res,next){
    childPhotoListid = req.body.childPhotoListid;
    imgurl = req.body.imgurl;
    imgurl.map(async function(item){
        await childPhotoM.delChildPhoto(item)
    })
    var data = await childPhotoM.findByPid(childPhotoListid);
    res.json(data)
})

module.exports = router;