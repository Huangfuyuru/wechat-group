const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个成长记录
 *
 * @param {Object} text 
 * @returns
 */
async function addChildGrow(text){
    let sql = 'insert into childGrow(weight,length,age,cid) values ($1,$2,$3,$4)';
    let ret = await pgdb.query(sql,[text.weight,text.length,text.age,text.cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childGrow中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childGrow';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childGrow id删除成长记录
 * @param {int} idC
 * @returns
 */
async function delChildGrow(id){
    let sql = 'delete from childGrow where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的成长记录内容
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByCid(cid){
    let sql = 'select * from childGrow where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childGrow id找到该childGrow的具体信息
 * @param {int} id
 * @returns 语音具体信息
 */
async function findById(id){
    let sql = 'select * from childGrow where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据亲子id找到所有该亲子创建的childGrow的id
 *
 * @param {*} cid
 * @returns 返回id
 */
async function findIdByCid(cid){
    let sql = 'select id from childGrow where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
exports.addChildGrow = addChildGrow;
exports.findAll = findAll;
exports.delChildGrow = delChildGrow
exports.findByCid = findByCid;
exports.findById = findById;
exports.findIdByCid = findIdByCid;
