const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url');
const {childM} = require('../../database/dateMethod');//引入数据库

//更改图片
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var childsid = Number(request.childsid);
    var imgurl = request.background;
    console.log('back')
    var data = await childM.changeBackGroundById(imgurl,childsid);
    res.json({code:data})
})

module.exports = router;