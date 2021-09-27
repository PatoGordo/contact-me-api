import mysql from "mysql";

function db() {
  return mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASS,
  });
}

export default db();
