const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    lover = require('../../database/dateMethod');
var info ={};//返回给前端的数据


//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());

// 匹配 /lover/ldairy

router.get('/',async function(req,res,next){

    var id = req.query.loverid;
    console.log(id);
    var data =await lover.loverDiaryM.findByPid(id);
    if(data !== 1){
        info ={
            code:0,
            msg:data
        }
        res.json(info);
    }else{
        info ={
            code:1,
            msg:'传入的爱人lid有误'
        }
        res.json(data);
    }
    
});

//增加日记
router.post('/addDairy',async function(req,res,next){
    console.log(req.body);
    var id = req.body.loverid;
    var text ={
        lid:id,
        name:req.body.name,
        content:req.body.content,
        imgurl:req.body.imgurl
    }
    console.log('add',addDairy);
    if(addDairy ===0){
        // var data =await lover.loverDiaryM.findByPid(id);
        info = {
            code:0,
            msg:data
        };
        res.json(info);
    }else{
        info ={
            code :1,
            msg:'增加日记失败'
        };
        res.json(info);
    }
    
});

router.get('/delDairy',async function(req,res,next){
    var daid = req.query.loverDiaryid;
    console.log('dairyid',daid);
    var delDairy = await lover.loverDiaryM.delLoverDiary(daid);
    if(delDairy === 0 ){
        var data =await lover.loverDiaryM.findByPid(daid);
        info ={
            code:0,
            msg:data
        };
        console.log('删除后查看日记所有信息',await lover.loverDiaryM.findAll());
        res.json(data);
    }else{
        info={
            code:1,
            msg:'删除日记失败'
        }
        res.json(data);
    }
    
})

module.exports = router;