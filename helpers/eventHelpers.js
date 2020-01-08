const db = require('../data/dbConfig')

module.exports = {

    find,
    add,
    findById,
    findByHostId,
    update

}

function find(){

    return db('events')

}

async function add(values){
    const [newEvent] = await db('events')
        .insert(values)
        .returning('*')

    return newEvent
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

async function update(id, values){

    const [updated] = await db('events')
        .where({id: id})
        .first()
        .update(values)
        .returning('*')

    return updated
    
}