/**
 * @fileoverview Database access
 *
 */

const mysql = require('mysql');

/**
 * @function Connect to database
 *
 * @returns {object} Object containing 'connection' property
 *
 */
module.exports = () => {
  try {
    const connection = mysql.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    });
    connection.connect();
    return connection;
  } catch (err) {
    console.log(`Error in connection in database/database.js: ${err}`);
  }
}
