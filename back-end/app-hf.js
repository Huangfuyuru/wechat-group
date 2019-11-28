// //方法一 直接用于不分解
// let data = require('./database/dateMethod');

// //方法二 把表的方法分解处理 
// let { childM,userM } = require('./dateMethod');



// async function loginUser(){

//     //方法一
//     var a = await data.userM.findAll();
//     console.log(a)

//     //方法二
//     var b = await childM.findAll();
//     console.log(b)

// }
// loginUser();


const express = require('express');
const app = express();
var childGrow = require('./router/childGrow');

app.use('/childGrow',childGrow);

app.listen(3000)