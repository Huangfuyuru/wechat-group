var userM = require('./database/modules/userM');

async function loginUser(){
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

    var a = await userM.findTelById('100001');
    console.log(a)

}
loginUser()
// userM.findTel('15930300511').then(res=>console.log(res))
