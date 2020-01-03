const db = require('../data/dbConfig.js')

module.exports = {
    findByEmail,
    add,
    find
}

function findByEmail(email){
    return db('users')
        .where({email: email})
        .first();
}

function add(values){
    return db('users')
        .insert(values)
        .then(() => {
            return db('users')
                .where({email: values.email})
                .first();
        })
        .catch( err => err)

}

function find(){
    return db('users')
}

