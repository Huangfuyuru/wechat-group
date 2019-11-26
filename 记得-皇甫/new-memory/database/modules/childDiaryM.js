const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一条日记
 *
 * @param {Object} text 参照数据表 name,content,imgurl,cid(亲子id)
 * @returns
 */
async function addChildDiary(text){
    let sql = 'insert into childDiary(name,content,imgurl,cid) values ($1,$2,$3,$4)';
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看ChildDiary中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childDiary';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childDiary id删除日记
 * @param {int} id
 * @returns
 */
async function delChildDiary(id){
    let sql = 'delete from childDiary where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的日记内容
 *
 * @param {*} cid
 * @returns 所有日记的内容
 */
async function findByCid(cid){
    let sql = 'select * from childDiary where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据日记id找到该日记的具体信息
 * @param {int} id
 * @returns 日记具体信息
 */
async function findById(id){
    let sql = 'select * from childDiary where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
exports.addChildDiary = addChildDiary;
exports.findAll = findAll;
exports.delChildDiary = delChildDiary;
exports.findByCid = findByCid;
exports.findById = findById;
