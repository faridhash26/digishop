const bcrypt = require("bcryptjs");

const users = [
  {
    name: "admin user",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "setare yazdani",
    email: "setare@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "morteza hamedani",
    email: "morteza@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
