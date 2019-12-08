const pgdb = require('./connect');

 // 成功返回0或数据  失败返回1
/**
 * 传入手机号、密码，验证用户是否存在
 * 不存在返回null,存在返回用户数据
 * @param {string} tel 
 * @param {string} pass
 * @return {Object} 是一个对象，具体参数参照数据表  
 */

async function login(tel,pass){
    let sql = 'select * from users where tel = $1 and pass = $2';
    let ret = await pgdb.query(sql,[tel,pass]);
    if(ret.rowCount<=0){
        return 1;
    }else{
        return ret.rows[0];
    }
}

/**
 * 验证是否已经注册
 * 传入电话，如何电话号存在，返回0，不存在返回1
 * @param {String} tel 
 */
async function findTel(tel){
    let sql = 'select * from users where tel = $1';
    let ret = await pgdb.query(sql,[tel]);
    if(ret.rowCount<=0){
        return 0
    }else{
        return 1
    }
}

/**
 * 增加用户 前提是用户没有注册，也就是说数据库中没有这个电话
 * 如何增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addUser(person){
    let sql = 'insert into users(pass,tel) values($1,$2)';
    let ret = await pgdb.query(sql,[person.pass,person.tel]);
    if(ret.rowCount<=0){
        return 1;
    }else{
        return 0;
    }
}

/**
 *
 * 根据tel 删除用户
 * @param {String} tel
 * @returns
 */
async function delUser(tel){
    let sql = 'delete from users where tel = $1';
    let ret = await pgdb.query(sql,[tel]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据tel查找用户id
 *
 * @param {String} tel
 * @returns
 */
async function findIdByTel(tel){ 
    let sql = 'select uid from users where tel = $1';
    let ret = await pgdb.query(sql,[tel]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows[0]
    }
}

/**
 *根据id查找用户电话
 *
 * @param {String} id
 * @returns
 */
async function findTelById(id){
    let sql = 'select tel from users where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows[0]
    }
}

/**
 *查看所有用户信息
 *
 * @returns 所有用户信息
 */
async function findAll(){
    let sql = 'select * from users';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

var userM = {
    login,findTel,addUser,delUser,findIdByTel,findTelById,findAll
}
module.exports = userM;