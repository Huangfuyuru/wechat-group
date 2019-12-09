const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    fs = require('fs');
    lover = require('../../database/dateMethod');


//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({extended:true}));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());

// 匹配 /lover/ldairy

router.get('/',async function(req,res,next){

    var id = req.query.loverid;
    console.log(id);
    var data =await lover.loverDiaryM.findByPid(id);
    res.json(data);
});

router.post('/ldairy/addDairy',async function(req,res,next){
    console.log(req.body);
    var text ={
        lid:req.body.loverid,
        name:req.body.name,
        content:req.body.content,
        imgurl:req.body.imgurl
    }
    // await lover.loverDiaryM.addLoverDiary(text);
    console.log('增加后查看日记所有信息',await lover.loverDiaryM.findAll());

    //增加成功需要返回什么信息！ 暂定！商量
    res.json(' 日记添加成功！');
});

router.get('/delDairy',async function(){
    var daid = req.query.loverDiaryid;
    console.log(daid);
    // await lover.loverDiaryM.delLoverDiary(daid);
    console.log('删除后查看日记所有信息',await lover.loverDiaryM.findAll());
    res.json(' 日记删除成功！');

})

module.exports = router;