const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个childCurrent
 *注意一个亲子只有一个 childCurrent,如果亲子存在childCurrent我们是更新他的addnew
 *
 * @param {Object} text 
 * @returns
 */
async function addChildCurrent(text){
    let sql = 'insert into childCurrent(cid,position) values ($1,$2)';
    let ret = await pgdb.query(sql,[text.cid,text.position]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看childCurrent中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from childCurrent';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *L
 *根据childCurrent id删除恋爱日期
 * @param {int} idC
 * @returns
 */
async function delchildCurrent(id){
    let sql = 'delete from childCurrent where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *根据亲子cid找到所有 该亲子的创建的childCurrent
 *
 * @param {int} cid
 * @returns 所有爱人重要日期
 */
async function findByCid(cid){
    let sql = 'select * from childCurrent where cid = $1';
    let ret = await pgdb.query(sql,[cid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据childCurrent id找到该childCurrent的具体信息
 * @param {int} id
 * @returns 相片具体信息
 */
async function findById(id){
    let sql = 'select * from childCurrent where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}


/**
 *根据id修改childCurrent
 传入要修改的childCurrentid,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update loveList set name=$1,content=$2,imgurl=$3,local=$4 where id=$5'
    let ret = await pgdb.query(sql,[text.name,text.content,text.imgurl,text.local,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var loveListM = {
    addloveList,findAll,delLoveList,findById,findByLid,findIdByLid,changeById
}
module.exports = loveListM;