const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一条最新背景
 *在新建亲子的时候才增加，其他情况只是更新，不增加
 * @param {Object} text 参照数据表 
 * @returns
 */
async function addChildBackGround(text){
    let sql = 'insert into childBackground(cid,imgurl) values ($1,$2)';
    let ret = await pgdb.query(sql,[text.cid,text.imgurl]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childBackground中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childBackground';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据childBackground id删除记录
 * @param {int} id
 * @returns
 */
async function delChildBackGround(id){
    let sql = 'delete from childBackground where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子id找到所有 该亲子创建的最新背景
 *
 * @param {*} cid
 * @returns 所有日记的内容
 */
async function findByCid(cid){
    let sql = 'select * from childBackground where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childBackground id找到该childBackground的具体信息
 * @param {int} id
 * @returns 日记具体信息
 */
async function findById(id){
    let sql = 'select * from childBackground where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据childBackground id修改childBackground信息 主要修改的是imgurl
 传入要修改的id ,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update childBackground set imgurl=$1 where id = $2'
    let ret = await pgdb.query(sql,[text.imgurl,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var childBackgroundM = {
    addChildBackGround,findAll,delChildBackGround,findByCid,findById,changeById
}
module.exports = childBackgroundM