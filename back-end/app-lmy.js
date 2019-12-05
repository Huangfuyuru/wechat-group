const express = require('express');

// 引入模块
const login = require('./routes/login');
// const childGrow = require('./routes/childGrow');


const app = new express();

app.use('/login',login);
app.use('/child/cgrowup',childGrow);

app.listen(3000);

