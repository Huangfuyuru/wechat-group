const express = require('express'),
      app = express(),
      router = express.Router(),
      bodyParser = require("body-parser"),
      lover = require('../../database/dateMethod');

var info = {};

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/',async function(req,res,next){
    var lid = Number(req.query.loverid);
    console.log('photoid ',lid);
    var photoList =await lover.loverPhotoListM.findByLid(lid);
    if(photoList !== 1){
        info = {
            code:0,
            msg:photoList
        }
        res.json(info)
    }else{
        info ={
            code:1,
            msg:'获取爱人相册信息失败'
        }
        res.json(info)

    }
});

//点击具体相册
router.get('/show',async function(req,res,next){
    console.log('点击具体相册',req.query);
    var photoListid = Number(req.query.loverPhotoListid);
    console.log(photoListid);
    var data = await lover.loverPhotoM.findByPid(photoListid);
    if(data!== 1){
        info ={
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info ={
            code:1,
            msg:'查看相册详细信息失败'
        }
        res.json(info);
    }

});

router.post('/lcpictures',async function(req,res,next){
    console.log('添加相册');
    var lid = Number(req.body.loverid);
        name = req.body.name,
        text={
            lid:lid,
            name:name
        }
    var addPList =  await lover.loverPhotoListM.addLoverPhotoList(text);
    if(addPList === 0){
        var data = await lover.loverPhotoListM.findByLid(lid);
        info={
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info={
            code:1,
            msg:'增加相册失败'
        }
        res.json(info);
    }
});

//删除相册失败
router.get('/lrpictures',async function(req,res,next){
    var lPLid = Number(req.query.loverPhotoListid),
    lid = Number(req.query.loverid);
    console.log(req.query);
    var delPL = await lover.loverPhotoListM.delLoverPhotoList(lPLid);
    if(delPL === 0){
        var data= lover.loverPhotoListM.findByLid(lid); 
        info ={
            code:0,
            info:data
        }
        res.json(info);
    }else{
        info ={
            code:1,
            msg:'删除相册失败'
        }
        res.json(info);
    }
})

//增加照片
router.post('/laddpictures',async function(req,res,next){
    var lPLid = Number(req.body.loverPhotoListid),
        imgs = req.body.imgurl;
    var text = {
        lid:lPLid,
        imgurl:imgs
    };
    var addPhoto = await lover.loverPhotoM.addLoverPhoto(text);
    if(addPhoto === 0){
        var data= lover.loverPhotoM.findByPid(lPLid);
        info={
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info={
            code:1,
            msg:'增加相片失败'
        }
        res.json(info);
    }    
});

router.post('/ldelpictures',async function(req,res,next){
    var lPLid = Number(req.body.loverPhotoListid),
        lPid = Number(req.body.loverPhotoid)
    var delPhoto = await lover.loverPhotoM.delLoverPhoto('lPid');
    if(delPhoto === 0){
        var data = await lover.loverPhotoM.findByPid(lPLid);
        info={
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info ={
            code:1,
            msg:'删除照片失败'
        }
        res.json(info);
    }s
})

module.exports = router;