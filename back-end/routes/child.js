const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url');
const {childM,userM} = require('../database/dateMethod')

const cpictures = require('./child/cpictures'),
      csound = require('./child/csound'),
      cevents = require('./child/cevents'),
      cgrowup = require('./child/cgrowup'),
      cstudy = require('./child/cstudy'),
      cdairy = require('./child/cdairy'),
      change = require('./child/change');

router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
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