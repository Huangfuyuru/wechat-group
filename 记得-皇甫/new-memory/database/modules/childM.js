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
        return 0
    }
}

exports.addChild = addChild;