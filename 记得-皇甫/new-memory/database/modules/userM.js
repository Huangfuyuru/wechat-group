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
        return null;
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
    let ret;
    if(person.gender){
        let sql = 'insert into users(uname,pass,tel,imgurl,gender) values($1,$2,$3,$4,$5)';
        ret = await pgdb.query(sql,[person.uname,person.pass,person.tel,person.imgurl,person.gender]);
    }else{
        let sql = 'insert into users(uname,pass,tel,imgurl) values($1,$2,$3,$4)';
        ret = await pgdb.query(sql,[person.uname,person.pass,person.tel,person.imgurl]);
    }
    
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
    let sql = 'select tel from users where uid = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows[0]
    }
}
exports.login = login;
exports.findTel = findTel;
exports.addUser = addUser;
exports.delUser = delUser;
exports.findIdByTel = findIdByTel;
exports.findTelById = findTelById;