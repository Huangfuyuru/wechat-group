const express = require('express'),
      app = express();
const child = require('./routes/child');
//只要输入  http://localhost:3001/child/...就可以进入对应的路由
app.use('/child',child);
app.listen(3001);