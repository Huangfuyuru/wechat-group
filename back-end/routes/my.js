const express = require('express'),
      router = express.Router();

const maddchild = require('./my/addchild'),
      mdelchild = require('./my/delchild'),
      maddlover = require('./my/addlover'), 
      mdellover = require('./my/dellover'),
      mmessage = require('./my/message'),
      minformation = require('./my/information');

router.use('/addchild',maddchild);
router.use('/delchild',mdelchild);
router.use('/addlover',maddlover);
router.use('/dellover',mdellover);
router.use('/message',mmessage);
router.use('/information',minformation);



module.exports = router;