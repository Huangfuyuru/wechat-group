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
    console.log('My的uid',req.body.uid);
    var uid = req.body.uid;
    var data = await userM.findById(uid);
    //输出该用户的信息
    console.log("用户目前的信息",data);
    res.json(data);

})

router.use('/addchild',maddchild);
router.use('/delchild',mdelchild);
router.use('/addlover',maddlover);
router.use('/dellover',mdellover);
router.use('/message',mmessage);
router.use('/information',minformation);



module.exports = router;