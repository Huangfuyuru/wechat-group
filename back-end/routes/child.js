const express = require('express'),
      router = express.Router();

const cpictures = require('./child/cpictures'),
      csound = require('./child/csound'),
      cevents = require('./child/cevents'),
    //   cgrowup = require('./child/cgrowup'),
      cstudy = require('./child/cstudy'),
      cdairy = require('./child/cdairy'),
      change = require('./child/change');

router.use('/cpictures',cpictures);
router.use('/csound',csound);
router.use('/cevents',cevents);
// router.use('/cgrowup',cgrowup);
router.use('/cstudy',cstudy);
router.use('/cdairy',cdairy);
router.use('/change',change)


module.exports = router;