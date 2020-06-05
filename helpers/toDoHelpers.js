const db = require("../data/dbConfig");

module.exports = {
  find,
  findByEventId,
  add,
  update,
  remove,
  findByItemId,
};

function find() {
  return db("to_do");
}

function findByEventId(eventId) {
  return db("to_do").where({ event_id: eventId });
}

function findByItemId(id) {
  return db("to_do").where({ id: id }).first();
}

async function add(values) {
  const [newToDo] = await db("to_do").insert(values).returning("*");

  return newToDo;
}

async function update(id, values) {
  await db("to_do").where({ id: id }).update(values);

  const item = await findByItemId(id);

  return item;
}

function remove(id) {
  return db("to_do").where({ id: id }).delete();
}
