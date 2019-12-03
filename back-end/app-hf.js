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

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


var img = require('./routes/img');

app.use('/img',img);

app.listen(3000)