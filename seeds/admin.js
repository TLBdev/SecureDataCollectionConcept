const { adminSecret } = require('../authConfig/secrets')
const { passSecret } = require('../authConfig/secrets')
const bcrypt = require("bcryptjs");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      const hash = bcrypt.hashSync(passSecret, 10);
      return knex('users').insert([
        { id: 1, username: adminSecret, password: hash, name: 'none', active: true }
      ]);
    });
};
