var userM = require('./new-memory/modules/userM');
var loverM = require('./new-memory/modules/loverM');
var childM = require('./new-memory/modules/childM');
var childDiaryM = require('./new-memory/modules/childDiaryM');
var childVoiceM = require('./new-memory/modules/childVoiceM');
var childPhotoListM = require('./new-memory/modules/childPhotoListM');
var childGrowM = require('./new-memory/modules/childGrowM');
var childPhotoM = require('./new-memory/modules/childPhotoM')
async function loginUser(){
    var a = await childPhotoM.findIdByPid(3300002)
    console.log(a)
    // var a = await childGrowM.delChildGrow(3400004)
    // var b = await childGrowM.findAll();
    // console.log(b)
    // var a = await childPhotoListM.findIdByCid(300001)
    // console.log(a)
    // var a = await childPhotoListM.findByCid(300001);
    // console.log(a)
    // var a = await childPhotoListM.addChildPhotoList({
    //     name:'宝宝百天了',
    //     cid:300001
    // })
    // var a = await childPhotoListM.delChildPhotoList(3300003)
    // var b = await childPhotoListM.findAll();
    // console.log(b)
    //  var a = await childVoiceM.delChildVoice(3200004)
    // var a = await childVoiceM.addChildVoice({
    //     name:'xixi',
    //     voiceurl:'#1',
    //     cid:300001
    // })

    // var a = await childVoiceM.findByCid(300001);
    // console.log(a)
    // var a = await childVoiceM.findAll();
    // console.log(a)
    // var a = await childDiaryM.findById(3100001);
    // console.log(a)
    // var a = await childDiaryM.delChildDiary(3100004);
    // console.log(a)
    // var a = await childDiaryM.findAll();
    // console.log(a)
    // var a1 = await userM.findTel('15930300511');
    // if(a1 == 0){
    //     console.log('手机号不存在，可以注册')
    // }else{
    //     console.log('手机号存在，已经注册')
    // }
    
    // var a = await userM.addUser({
    //     uname:'person1',
    //     pass:'123456',
    //     tel:'15930300515',
    //     imgurl:'#',
    // })
    // console.log(a);

    // var a = await userM.delUser('15930300515');
    // console.log(a)

    // var a = await userM.findTelById('100001');
    // console.log(a)
    // var a = await userM.login('15930300511','123456');
    // console.log(a);

    // var a = await childM.addChild({
    //     name:'张三丰',
    //     birthday:'2018-05-06',
    //     gender:'男',
    //     uid:'100001'
    // })
    // console.log(a)

}
loginUser();
// userM.findTel('15930300511').then(res=>console.log(res))
