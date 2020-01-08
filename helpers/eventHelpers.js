const db = require('../data/dbConfig')

module.exports = {
    find,
    add,
    findById,
    findByHostId
}

function find(){

    return db('events')

}

function add(values){
    return db('events')
        .insert(values);
}

function findByHostId(userId){

    return db('events')
        .where({host_id: userId});
        
}

function findById(id){
    return db('events')
        .where({id: id})
        .first();
}