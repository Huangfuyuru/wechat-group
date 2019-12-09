const express = require('express'),
       router = express.Router(),
       bodyParser = require("body-parser");
       lover = require('../database/dateMethod');


//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const lovePictures = require('./lover/lovePictures'),
      loveSound = require('./lover/loveSound'),
      loveDinary = require('./lover/loveDinary'),
      loveList = require('./lover/loveList'),
      loveSouvenir = require('./lover/loveSouvenir');


      
router.get('/',async function(req,res,next){

       var uid = req.body.uid;
       var data = await lover.loverM.findIdByUid(uid);
       res.json(data);
});

router.use('/lpictures',lovePictures);
router.use('/lsound',loveSound);
router.use('/ldairy',loveDinary);
// router.use('/loveList',loveList);
router.use('/lsouvenir',loveSouvenir);

module.exports = router;
