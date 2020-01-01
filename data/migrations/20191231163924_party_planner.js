
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (user) => {
        user
            .string('id')
            .unique()
            .primary()
            .notNullable()
        user
            .string('first_name')
            .notNullable()
        user
            .string('last_name')
            .notNullable()
        user
            .string('password')
            .notNullable()
    })
    .createTable('event_themes', (theme) => {
        theme
            .string('id')
            .unique()
            .primary()
            .notNullable()
        theme
            .string('name')
            .unique()
            .notNullable()
    })
    .createTable('events', (event) => {
        event
            .string('id')
            .unique()
            .primary()
            .notNullable()
        event
            .date('date')
            .notNullable()
        event
            .integer('budget')
            .notNullable()
        event
            .string('city')
            .notNullable()
        event
            .string('state')
            .notNullable()
        event
            .string('address')
            .notNullable()
        event
            .integer('zip-code')
            .notNullable()
        event
            .boolean('private')
            .notNullable()
        event
            .string('host_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        event
            .string('theme_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('event_themes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  
};
