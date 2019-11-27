const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个相册
 *
 * @param {Object} text 
 * @returns
 */
async function addChildPhotoList(text){
    let sql = 'insert into childPhotoList(name,cid) values ($1,$2)';
    let ret = await pgdb.query(sql,[text.name,text.cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childPhotoList中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childPhotoList';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childPhotoList id删除日记
 * @param {int} id
 * @returns
 */
async function delChildPhotoList(id){
    let sql = 'delete from childPhotoList where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的相册
 *
 * @param {*} cid
 * @returns 所有日记的内容
 */
async function findByCid(cid){
    let sql = 'select * from childPhotoList where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据语音id找到该相册的具体信息
 * @param {int} id
 * @returns 语音具体信息
 */
async function findById(id){
    let sql = 'select * from childPhotoList where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据亲子id找到所有该亲子创建的相册的id
 *
 * @param {*} cid
 * @returns 返回相册id
 */
async function findIdByCid(cid){
    let sql = 'select id from childPhotoList where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
/**
 *根据id修改亲子相册信息
 传入要修改的亲子相册id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update childPhotoList set name=$1 where id = $2'
    let ret = await pgdb.query(sql,[text.name,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
exports.addChildPhotoList = addChildPhotoList;
exports.findAll = findAll;
exports.delChildPhotoList = delChildPhotoList;
exports.findByCid = findByCid;
exports.findById = findById;
exports.findIdByCid = findIdByCid;
exports.changeById = changeById;
