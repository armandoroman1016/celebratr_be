const db = require('../data/dbConfig')

module.exports = {

    find,
    findByEventId,
    add,
    update,
    remove

}

function find(){

    return db('to_do');

}

function findByEventId(eventId){

    return db('to_do')
        .where({event_id: eventId});

}

function add(values){

    return db('to_do')
        .insert(values);

}

function update(id, values){

    return db('to_do')
        .where({id: id})
        .update(values);

}

function remove(id){

    return db('to_do')
        .where({id: id})
        .delete();

}
