const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
const {childM,userM} = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const cpictures = require('./child/cpictures'),
      csound = require('./child/csound'),
      cevents = require('./child/cevents'),
      cgrowup = require('./child/cgrowup'),
      cstudy = require('./child/cstudy'),
      cdairy = require('./child/cdairy'),
      change = require('./child/change');

router.post('/',async function(req,res,next){
    var uid = Number(req.body.uid);
    console.log(req.body.uid);
    console.log(req.body)
    console.log(typeof uid);
    console.log(uid)
    var data = await childM.findIdByUid(uid);
    res.json(data);
})
router.use('/cpictures',cpictures);
router.use('/csound',csound);
router.use('/cevents',cevents);
router.use('/cgrowup',cgrowup);
router.use('/cstudy',cstudy);
router.use('/cdairy',cdairy);
router.use('/change',change)



module.exports = router;