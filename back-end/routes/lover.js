const express = require('express'),
       router = express.Router();

const lovePictures = require('./lover/lovePictures'),
      loveSound = require('./lover/loveSound'),
      loveDinary = require('./lover/loveDinary'),
      loveList = require('./lover/loveList'),
      loveSouvenir = require('./lover/loveSouvenir');


// router.use('/',async function(req,res,next){
       
// })

router.use('/lpictures',lovePictures);
router.use('/lsound',loveSound);
router.use('/ldairy',loveDinary);
// router.use('/loveList',loveList);
router.use('/lsouvenir',loveSouvenir);

module.exports = router;
