const express = require('express'),
      app = express(),
      session = require('express-session');
const login = require('./routes/login');
const child = require('./routes/child');
const resign =require('./routes/register');
const img = require('./routes/img')

//解决跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// //配置session 中间件
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { 
//         maxAge:1000*60*30
//     },
//     rolling:true
// }))

// //自定义中间件，判断登陆状态
// app.use(function(req,res,next){
//     if(req.url == '/login'){
//         next()
//     }else{
//         if(session.userinfo && session.userinfo.id!=''){
//             next()
//         }else{
//             res.redirect('/login')
//         }
//     }
    
// })

app.use('/login',login);
app.use('/resign',resign);
app.use('/child',child);
app.use('/img',img);
app.listen(3001);


    