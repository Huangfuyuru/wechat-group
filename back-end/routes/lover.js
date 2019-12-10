const express = require('express'),
       router = express.Router(),
       fs = require('fs'),
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


router.get('/',function(req,res,next){
       var html=fs.readFileSync('./testing-yxd/loveDinary.html').toString('utf8');
       res.writeHead(200,{
              'Content-Type':'text/html;charset=UTF8',
              'Content-Length':'Buffer.byteLength(html)'
       });
       res.end(html);
})
      
router.post('/',async function(req,res,next){
       console.log('uid',req.body.uid);
       var uid = req.body.uid;
       var data = await lover.loverM.findIdByUid(uid);
       console.log(data);
       res.json(data);
});

router.use('/lpictures',lovePictures);
router.use('/lsound',loveSound);
router.use('/ldairy',loveDinary);
// router.use('/loveList',loveList);
router.use('/lsouvenir',loveSouvenir);

module.exports = router;
