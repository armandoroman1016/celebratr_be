const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("password", 14);

exports.seed = function (knex) {
  return knex("users").insert([
    {
      id: "guest123",
      email: "guestaccount@celebratr.co",
      first_name: "Guest",
      last_name: "User",
      password: password,
      type: "guest",
    },
  ]);
};
