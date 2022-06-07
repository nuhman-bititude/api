const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb",
    charset: "utf8",
  },
});

const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;
