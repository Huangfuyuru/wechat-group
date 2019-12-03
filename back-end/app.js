const express = require('express');

// 引入模块
const login = require('./routes/login');
const app = new express();

app.use('/menus/login',login);

app.listen(3000);

