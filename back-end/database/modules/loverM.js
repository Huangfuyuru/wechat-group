const pgdb = require('./connect');


/**
 *增加爱人
 *
 * @param {Object} person
 * @returns
 */
async function addLover(person){
    let ret;
    if(person.gender){
        let sql = 'insert into lovers(name,ldate,gender,uid) values ($1,$2,$3,$4)';
        ret = await pgdb.query(sql,[person.name,person.ldate,person.gender,person.uid])
    }else{
        let sql = 'insert into lovers(name,ldate,uid) values ($1,$2,$3)';
        ret = await pgdb.query(sql,[person.name,person.ldate,person.uid])
    }
    if(ret.rowCount<=0){
        return 1
    }else{
        return 0
    }
}

exports.addLover = addLover;