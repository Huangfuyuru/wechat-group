const pgdb = require('./connect');

 // 成功返回0或数据  失败返回1
/**
 * 传入邮箱、密码，验证用户是否存在
 * 不存在返回null,存在返回用户数据
 * @param {string} email 
 * @param {string} pass
 * @return {Object} 是一个对象，具体参数参照数据表  
 */

async function login(email,pass){
    let sql = 'select * from users where email = $1 and pass = $2';
    let ret = await pgdb.query(sql,[email,pass]);
    if(ret.rowCount<=0){
        return 1;
    }else{
        return ret.rows[0];
    }
}

/**
 * 验证是否已经注册
 * 传入电话，如何电话号存在，返回0，不存在返回1
 * @param {String} email 
 */
async function findemail(email){
    let sql = 'select * from users where email = $1';
    let ret = await pgdb.query(sql,[email]);
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
    let sql = 'insert into users(pass,email) values($1,$2)';
    let ret = await pgdb.query(sql,[person.pass,person.email]);
    if(ret.rowCount<=0){
        return 1;
    }else{
        return 0;
    }
}

/**
 *
 * 根据email 删除用户
 * @param {String} email
 * @returns
 */
async function delUser(email){
    let sql = 'delete from users where email = $1';
    let ret = await pgdb.query(sql,[email]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据email查找用户id
 *
 * @param {String} email
 * @returns
 */
async function findIdByemail(email){ 
    let sql = 'select uid from users where email = $1';
    let ret = await pgdb.query(sql,[email]);
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
async function findemailById(id){
    let sql = 'select email from users where id = $1';
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

/**
 *根据id修改用户信息
 传入要修改的用户id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update users set name = $1,imgurl=$2,pass=$3,gender=$4 where id = $5'
    let ret = await pgdb.query(sql,[text.name,text.imgurl,text.pass,text.gender,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

async function findById(id){
    let sql = 'select * from users where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows[0]
    }
}
var userM = {
    login,findemail,addUser,delUser,findIdByemail,findemailById,findAll,changeById,findById
}
module.exports = userM;