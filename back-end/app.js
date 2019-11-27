var userM = require('./database/modules/userM');
var loverM = require('./database/modules/loverM');
var childM = require('./database/modules/childM');
var childDiaryM = require('./database/modules/childDiaryM');
var childVoiceM = require('./database/modules/childVoiceM');
var childPhotoListM = require('./database/modules/childPhotoListM');
var childGrowM = require('./database/modules/childGrowM');
var childPhotoM = require('./database/modules/childPhotoM');
var childAdolesceM = require('./database/modules/childAdolesceM');
async function loginUser(){

    // var a = await childPhotoListM.changeById(3300001,{
    //     name:'xx'
    // })
    // var b = await childPhotoListM.findAll();
    // console.log(b)
    // var a = await childGrowM.changeById(3400001,{
    //     weight:120,
    //     length:20,
    //     age:2,
    // })
    // var b = await childGrowM.findAll();
    // console.log(b)
    // var a = await childDiaryM.changeById(3100001,{
    //     name:'叫妈妈',
    //     content:'今天小雪第一次叫妈妈',
    //     imgurl:['#1','#2','#3'],
    // })
    // console.log(a)
    // var b = await childDiaryM.findAll();
    // console.log(b)
    // var a = await childAdolesceM.changeById(3500001,{
    //     item:['第一次'],
    //     name:'走路',
    //     imgurl:['#1','#2','#3'],
    //     content:'小雪第一次走路',
    // })
    // var b = await childAdolesceM.findAll();
    // console.log(b)
    // var a = await childM.changeById(300001,{
    //     name:'小雪',
    //     birthday:'2019-01-01',
    //     gender:'女'
    // })
    // console.log(a)
    // var b = await childM.findAll()
    // console.log(b)
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
