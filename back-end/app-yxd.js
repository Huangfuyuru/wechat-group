var express = require('express');

var register =require('./routes/register');
var message = require('./routes/register_message');
var app =new express();

// //若url中输入的不存在会进入'/'下面的（及index）里面找
// app.use('/',index);
app.use('/menus/resign',register);

app.use('/resign/message',message);

app.listen(3001);