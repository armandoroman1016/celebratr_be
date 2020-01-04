const db = require('../data/dbConfig')

module.exports = {
    find,
    add,
    findById

}

function find(){

    return db('events')

}

function add(values){
    return db('events')
        .insert(values);
}

function findById(id){
    return db('events')
        .where({id: id})
        .first();
}