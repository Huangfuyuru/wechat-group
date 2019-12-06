const pgdb = require('./connect');



/**
 *增加亲子
 *
 * @param {Object} person
 * @returns
 */
async function addChild(person){
    let ret;
    if(person.gender){
        let sql = 'insert into childs(name,birthday,gender,uid) values ($1,$2,$3,$4)';
        ret = await pgdb.query(sql,[person.name,person.birthday,person.gender,person.uid])
    }else{
        let sql = 'insert into lovers(name,ldate,uid) values ($1,$2,$3)';
        ret = await pgdb.query(sql,[person.name,person.birthday,person.uid])
    }
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *根据亲子id删除这个亲子
 *
 * @param {*} id
 * @returns
 */
async function delChild(id){
    let sql = 'delete from childs where id = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

/**
 *
 * 根据亲子id 找到该亲子的具体信息
 * @param {int} id
 * @returns
 */
async function findById(id){
    let sql = 'select * from childs where id  = $1';
    let ret = await pgdb.query(sql,[id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *
 *根据用户id 查找该用户创建的所有亲子信息
 * @param {int} uid
 * @returns
 */
async function findIdByUid(uid){
    let sql = 'select * from childs where uid = $1';
    let ret = await pgdb.query(sql,[uid]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}
/**
 *查看亲子表中的所有内容
 *
 * @returns 
 */
async function findAll(){
    let sql = 'select * from childs';
    let ret = await pgdb.query(sql);
    if(ret.rowCount<=0){
        return 1
    }else{
        return ret.rows;
    }
}

/**
 *根据id修改亲子信息
 传入要修改的亲子id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(id,text){
    let sql = 'update childs set name = $1,birthday=$2,gender=$3 where id = $4'
    let ret = await pgdb.query(sql,[text.name,text.birthday,text.gender,id]);
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0;
    }
}

var childM = {
    addChild,findAll,findById,findIdByUid,delChild,changeById
}
module.exports = childM;

