const db = require('../data/dbConfig')

module.exports = {
    find,
    add,
    findByEventId,
    update,
    remove
}



function find(){
    return db('shopping_item');

}

function add(values){
    return db('shopping_item')
        .insert(values);

}

function findByEventId(eventId){
    return db('shopping_item')
        .where({event_id: eventId});

}

function update(id, values){
    return db('shopping_item')
        .where({id: id})
        .first()
        .update(values);

}

function remove(id){
    return db('shopping_item')
        .where({id: id})
        .first()
        .delete();
        
}