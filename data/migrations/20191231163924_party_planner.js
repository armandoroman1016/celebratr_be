
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (user) => {
        user
            .string('id')
            .unique()
            .primary()
            .notNullable()
        user
            .string('email', 96)
            .notNullable()
            .unique();
        user
            .string('first_name', 48)
            .notNullable()
        user
            .string('last_name', 48)
            .notNullable()
        user
            .string('password', 48)
            .notNullable()
    })
    .createTable('event_themes', (theme) => {
        theme
            .string('id')
            .unique()
            .primary()
            .notNullable()
        theme
            .string('name', 128)
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
            .string('city', 128)
            .notNullable()
        event
            .string('state', 128)
            .notNullable()
        event
            .string('address', 128)
            .notNullable()
        event
            .integer('zip-code', 10)
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
            .string('name', 128)
            .notNullable()
        task
            .string('notes', 1000)
            .nullable()
        task
            .boolean('completed')
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
            .string('name', 96)
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
            .string('name', 128)
        item
            .string('event_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        item
            .string('shopping_category_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('shopping_category')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        item
            .boolean('purchased')
            .defaultTo(0)
        item
            .string('notes', 1000)
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('shopping_item')
        .dropTableIfExists('shopping_category')
        .dropTableIfExists('vendors')
        .dropTableIfExists('to_do')
        .dropTableIfExists('guests')
        .dropTableIfExists('events')
        .dropTableIfExists('event_themes')
        .dropTableIfExists('users')

};
