//方法一 直接用于不分解
//let data = require('./database/dateMethod');

//方法二 把表的方法分解处理 
let {childBackgroundM,loverBackgroundM,childM} = require('./database/dateMethod');



async function loginUser(){

    //方法一
    // var a = await data.userM.findAll();
    // console.log(a)

    //方法二
    var c = await childM.addChild({
        name:'张三',
        birthday:'2015-05-02',
        gender:'男',
        uid:100001
    })
    // var b = await loverBackgroundM.findAll();
    console.log(c);
    var a = await childM.findAll();
    console.log(a)

}
loginUser();


// const express = require('express');
// const app = express();
// const fs = require("fs");

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });

// app.get("/page", function(req, res, next) {
//     var fileContent = fs.readFileSync("./app-hf.html");
//     res.writeHead(200, {"Content-Type":"text/html"});
//     res.end(fileContent);
// })

// //imgs
// var imgs = require('./routes/imgs');
// app.use('/imgs',imgs);

// var img = require('./routes/img');
// app.use('/img',img);

// //voice
// var voice = require('./routes/voice');
// app.use('/voice',voice);
// app.listen(3001)