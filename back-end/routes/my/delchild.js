const express = require('express'),
      router = express.Router(),
      bodyParser = require("body-parser"),
      url = require('url'),
      qs = require('qs');
//引入数据库
const {childM,childAdolesceM,childDiaryM,childGrowM,childPhotoM,childPhotoListM,childVoiceM} = require("../../database/dateMethod");

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//删除亲子
router.get('/',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var data =  await childM.findIdByUid(uid);
    res.json(data)
})

//确认删除
router.post('/confirm',async function(req,res,next){
    var request = qs.parse(url.parse(req.url).query);
    var uid = Number(request.uid);
    var cid = Number(request.cid);
    var arr = [];
    async function delChild(cid){
        var childPhotoList = await childPhotoListM.findIdByCid(cid)
        console.log(childPhotoList);
        var childAdolesce = await childAdolesceM.delAllByCid(cid);
        var childGrow = await childGrowM.delAllByCid(cid);
        var childDiary = await childDiaryM.delAllByCid(cid);
        var childVoice = await childVoiceM.delAllByCid(cid);
        var child = await childM.delChild(cid);
        arr.push(child)
    }
    delChild(cid);
    // var data = await childM.findById(uid);
    // all.map((item)=>{
    //     item.then((res)=>{
    //         if(res!=0){
    //             var message = {code:1,msg:"删除失败",data:data};
    //             res.json(message)
    //         }
    //     })
    // })
    // var message = {code:0,msg:"删除成功",data:data};
    // res.json(message0)
})

module.exports = router;