const express = require('express'),
      router = express.Router()
      bodyParser = require('body-parser'),
      lover = require('../../database/dateMethod');

var info = {};

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


//匹配路由  /lover/lsouvenir
router.get('/',async function(req,res,next){
    var lid = req.query.loverid;
    // console.log('lid',req.query.loverid);
    var data = await lover.loverImpDateM.findByPid(lid)
    res.json(data);
    // console.log(await lover.loverImpDateM.findByPid(lid));

});

//添加纪念日
router.post('/lcsouvenir',async function(req,res,next){
    var daid = req.bady.loverid;
    var text ={
        name:req.body.name,
        contnet: req.body.contnent,
        imgurl:req.body.imgurl,
        item:req.body.item,
        date:req.body.date,
        voiceurl:req.body.voiceurl,
        lid:req.body.loverid
    }
    var addsou = await lover.loverImpDateM.addLoverImpDate(text);
    if(addsou ===0){
        var data = await lover.loverImpDateM.findByPid(daid);
        info ={
            code:0,
            msg:data
        };
        console.log('增加纪念日后查看所有信息',await lover.loverDiaryM.findAll());
        res.json(data);
    }else{
        info={
            code:1,
            msg:'删除纪念日失败'
        }
    }
})

module.exports = router;