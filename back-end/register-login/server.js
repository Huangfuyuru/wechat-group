const {User} = require('./db')
const express = require('express')


const app = express()
//可以处理json
app.use(express.json())
//接口 
app.get('/api/users',async(req,res)=>{
    //查出所有用户
    const users = await User.find()
    res.send(users)
})

app.post('/api/register',async(req,res)=>{

    // const user = await userM.findTel(req.body.usernumber)
    // console.log(req.body)
    // console.log(user)
    // if(user == 1){
    //     console.log('RRR');
    // }
    // res.send(user)

    //注册用户  增加到数据库
    const user = await User.create({
        tel : req.body.tel,
        pass: req.body.pass,
    })
    res.send(user)

})
app.post('/api/login',async(req,res)=>{

   const user = await User.findOne({
       tel : req.body.tel
   })
   if(!user){
       return res.status(422).send({
           message : '用户名不存在'
       })
   }
    res.send(user)

})
app.listen(3001,()=>{
    console.log('http://localhost:3001')
})
