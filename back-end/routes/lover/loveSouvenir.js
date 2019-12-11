const express = require('express'),
      router = express.Router()
      bodyParser = require('body-parser'),
      lover = require('../../database/dateMethod');

var info = {};

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


//匹配路由  /lover/lsouvenir
router.get('/',async function(req,res,next){
    console.log('点击纪念日');
    var lid = Number(req.query.loverid);
    console.log('lid',lid);
    var data = await lover.loverImpDateM.findByPid(lid);
    // console.log('data',data)
    res.json(data);

});

//增加纪念日
router.post('/lcsouvenir',async function(req,res,next){
    console.log('增加纪念日');
    console.log(req.body);
    var daid = Number(req.body.loverid);
    var item = req.body.item.split( );
    var text ={
        item:item,
        name:req.body.name,
        imgurl:req.body.imgurl,
        lid:daid,
        date:req.query.date,
        contnet: '纪念日',
        voiceurl:'#'
    }
    var addsou = await lover.loverImpDateM.addLoverImpDate(text);
    console.log(addsou);
    if(addsou ===0){
        var data = await lover.loverImpDateM.findByPid(daid);
        info ={
            code:0,
            msg:data
        };
        console.log('增加纪念日后查看所有信息',await lover.loverImpDateM.findByPid(daid));
        res.json(data);
    }else{
        info={
            code:1,
            msg:'增加纪念日失败'
        }
        res.json(info);

    }
});

//删除纪念日
router.get('/delSouvenir',async function(req,res,next){
    console.log('删除日记')
    var lid = Number(req.query.loverid),
        limpDid = Number(req.query.loverImpDateid);
    console.log('delete loverid',lid);
    console.log('delete limpDid',limpDid);
    var delsou =  await lover.loverImpDateM.delLoverImpDate(limpDid);
    if(delsou === 0 ){
        var data = await lover.loverImpDateM.findByPid(lid);
        info = {
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info= {
            code:1,
            msg:'删除失败'
        }
        res.json(info);
    }
})


module.exports = router;