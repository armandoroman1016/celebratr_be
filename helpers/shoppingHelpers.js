const db = require('../data/dbConfig')

module.exports = {
    find,
    add,
    findByEventId,
    update,
    remove,
    findByItemId
}

function findByItemId(id){

    return db('shopping_item')
    .where({id: id})
    .first();

}

function find(){
    return db('shopping_item');

}

async function add(values){

    const [newShopping] = await db('shopping_item')
        .insert(values)
        .returning('*')

    return newShopping

}

function findByEventId(eventId){
    return db('shopping_item')
        .where({event_id: eventId});

}

async function update(id, values){
    await db('shopping_item')
        .where({id: id})
        .update(values);
    
    const item = await findByItemId(id)
    
    return item
}

function remove(id){
    return db('shopping_item')
        .where({id: id})
        .first()
        .delete();
        
}