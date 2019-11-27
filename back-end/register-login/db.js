const mongoose = require('mongoose')
//数据库连接 创建一个对象参数:表示连接参数
mongoose.connect('mongodb://148.70.223.218:27017/memory',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// const userM = require('./database/modules/userM')
const UserSchema = new mongoose.Schema({
    tel:{type:String,unique:true},
    pass:{type:String,unique:true},
})
const User = mongoose.model('User',UserSchema)

module.exports = {User}