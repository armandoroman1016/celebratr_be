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

async function add(values){


    const [newToDo] = await db('to_do')
        .insert(values)
        .returning('*');
    
    return newToDo

}

async function update(id, values){

    console.log('here', values)

    const [updated] = await db('to_do')
        .where({id: id})
        .update(values)
        .returning('*');

    return updated

}

function remove(id){

    return db('to_do')
        .where({id: id})
        .delete();

}
