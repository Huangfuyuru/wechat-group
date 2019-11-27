const pgdb = require('./connect');

// 返回0代表成功  返回1代表失败
/**
 *增加一个系统清单
 *
 * @param {Object} text 
 * @returns
 */
async function addList(text){
    let sql = 'insert into list(name) values ($1)';
    let ret = await pgdb.query(sql,[text.name]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }

}

/**
 *查看list中所有的数据
 *
 * @returns
 */
async function findAll(){
    let sql = 'select * from list';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows
    }
}

/**
 *
 *根据list id删除清单内容
 * @param {int} idC
 * @returnslist
 */
async function dellist(id){
    let sql = 'delete from list where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

/**
 *
 *根据list id找到该list的具体信息
 * @param {int} id
 * @returns list具体信息
 */
async function findById(id){
    let sql = 'select * from list where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改list内容
 传入要修改的list id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update loverVoice set name=$1 where id = $2'
    let ret = await pgdb.query(sql,[text.name,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}
exports.addList = addList;
exports.findAll = findAll;
exports.dellist = dellist
exports.changeById = changeById;
exports.findById = findById;