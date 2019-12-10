const express = require('express'),
      app = express(),
      router = express.Router(),
      bodyParser = require("body-parser"),
      lover = require('../../database/dateMethod');

var info = {};

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/',async function(req,res,next){
    var lid = req.query.loverid;
    console.log('photoList ',lid);
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


module.exports = router;