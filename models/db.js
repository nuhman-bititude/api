const knex = "require"({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "mydb",
    charset: "utf8",
  },
});

const bookshelf = require("bookshelf")(knex);

module.exports=bookshelf