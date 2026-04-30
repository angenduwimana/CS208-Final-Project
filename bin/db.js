// db.js
const mysql = require('mysql2');

let connection = null;

function createDbConnection() {
  if (!connection) {
    connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '12345',
      database: 'cs208demo'
    });

    connection.connect((err) => {
      if (err) {
        console.error('Database connection error:', err.message);
      } else {
        console.log('Database connected!');
      }
    });
  }

  return connection;
}

function dbMiddleware(req, res, next) {
  req.db = createDbConnection();
  next();
}

function closeDbConnection() {
  if (!connection) return;

  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err.message);
    }
    connection = null;
  });
}

module.exports = {
  dbMiddleware,
  createDbConnection,
  closeDbConnection
};
