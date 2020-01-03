
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
            .defaultTo(0)
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
    .createTable('guests', (guest) => {
        guest
            .string('id')
            .unique()
            .notNullable()
            .primary();
        guest
            .string('event_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        guest
            .string('user_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .createTable('to_do', (task) => {
        task
            .string('id')
            .unique()
            .notNullable()
            .primary()
        task
            .string('name')
            .notNullable()
        task
            .string('notes', 1000)
            .nullable()
        task
            .boolean()
            .defaultTo(0)
        task
            .string('event_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .createTable('vendors', (vendor) => {
        vendor
            .string('id')
            .unique()
            .notNullable()
            .primary()
        vendor
            .float('cost')
        vendor
            .string('notes', 1000)
        vendor
            .boolean('purchased')
            .defaultTo(0)
        vendor
            .string('event_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .createTable('shopping_category', (category) => {
        category
            .string('id')
            .unique()
            .notNullable()
            .primary()
        category
            .string('name', 86)
            .unique()
            .notNullable()
    })
    .createTable('shopping_item', (item) => {
        item
            .string('id')
            .unique()
            .notNullable()
            .primary()
        item
            .string('name', 86)
        item
            .string('event_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


    })
};

exports.down = function(knex) {
  
};
