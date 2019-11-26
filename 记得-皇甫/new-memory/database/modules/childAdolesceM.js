const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个成长节点
 *
 * @param {Object} text 
 * @returns
 */
async function addChildAdolesce(text){
    let sql = 'insert into childAdolesce(item,imgurl,content,cid) values ($1,$2,$3,$4)';
    let ret = await pgdb.query(sql,[text.item,text.imgurl,text.content,text.cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childAdolesce中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childAdolesce';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *C
 *根据childAdolesce id删除成长节点
 * @param {int} id
 * @returns
 */
async function delChildAdolesce(id){
    let sql = 'delete from childAdolesce where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的成长节点内容
 *
 * @param {*} cid
 * @returns 所有成长的内容
 */
async function findByCid(cid){
    let sql = 'select * from childAdolesce where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childAdolesce id找到该childAdolesce的具体信息
 * @param {int} id
 * @returns 成长节点具体信息
 */
async function findById(id){
    let sql = 'select * from childAdolesce where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据亲子id找到所有该亲子创建的childAdolesce的id
 *
 * @param {*} cid
 * @returns 返回相册id
 */
async function findIdByCid(cid){
    let sql = 'select id from childAdolesce where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
exports.addChildAdolesce = addChildAdolesce;
exports.findAll = findAll;
exports.delChildAdolesce = delChildAdolesce
exports.findByCid = findByCid;
exports.findById = findById;
exports.findIdByCid = findIdByCid;
