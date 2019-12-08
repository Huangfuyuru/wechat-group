const express = require('express'),
       router = express.Router();

const lovePictures = require('./lover/lovePictures'),
      loveSound = require('./lover/loveSound'),
      loveDinary = require('./lover/loveDinary'),
      loveList = require('./lover/loveList'),
      loveSouvenir = require('./lover/loveSouvenir');


// router.use('/',async function(req,res,next){
       
// })

router.use('/lovePictures',lovePictures);
router.use('/loveSound',loveSound);
router.use('/loveDinary',loveDinary);
router.use('/loveList',loveList);
router.use('/loveSouvenir',loveSouvenir);

module.exports = router;
