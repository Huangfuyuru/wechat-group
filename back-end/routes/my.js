const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser");
var {childM,userM,reportM} = require('../database/dateMethod');


//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const maddchild = require('./my/addchild'),
      mdelchild = require('./my/delchild'),
      maddlover = require('./my/addlover'), 
      mdellover = require('./my/dellover'),
      mmessage = require('./my/message'),
      minformation = require('./my/information');

    //参照child.js 12/10
router.post('/',async function(req,res,next){
    var uid = Number(req.body.uid);
    // var data = await childM.findIdByUid(uid);
    // res.json(data);
    var data = await childM.findById(uid);
    res.json(data);
})

router.use('/addchild',maddchild);
router.use('/delchild',mdelchild);
router.use('/addlover',maddlover);
router.use('/dellover',mdellover);
router.use('/message',mmessage);
router.use('/information',minformation);



module.exports = router;