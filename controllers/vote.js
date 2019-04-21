/**
 * @fileoverview Functions to handle voting
 *
 */


const initDb = require('../database/database');


/**
 * @function Find VoteMember by name
 * 
 * @param {array} name One or more VoteMember names
 * @param {function} callback The function to execute once this function is finished
 */
function getMemberByName(names, callback) {
  try {
    const connection = initDb();
    let statement = 'SELECT * FROM members WHERE name=? ';
    let values = [''];

    for (let name of names) {
      statement += 'OR name=? ';
      values.push(name)
    }

    connection.query(statement, values, (err, res, fields) => {
      if (err) throw err;
      return callback(res);
    });
    connection.end();
  } catch(err) {
    console.log(`Error in getMemberByName function in controllers/votes.js: ${err}`);
  }
}


/**
 * @function Create object of VoteMember type
 * 
 * @param {string} name VoteMember name
 * @param {function} callback The function to execute once this function is finished
 */
function createVoteMember(name, callback) {
  try {
    const connection = initDb();
    const statement = 'INSERT INTO members (name, votes) VALUES (?, 1)';
    connection.query(statement, [name], (err, res, fields) => {
      if (err) throw err;
      return callback(name);
    });
    connection.end();
  } catch(err) {
    console.log(`Error in createVoteMember function in controllers/votes.js: ${err}`);
  }
}


/**
 * @function Increment 'votes' attribute of VoteMember object by 1
 * 
 * @param {string} name VoteMember name
 * @param {function} callback The function to execute once this function is finished
 */
function updateVoteMember(name, callback) {
  try {
    const connection = initDb();
    const statement = 'UPDATE members SET votes=votes + 1 WHERE name=?';
    connection.query(statement, [name], (err, res, fields) => {
      if (err) throw err;
      return callback(name);
    });
    connection.end();
  } catch(err) {
    console.log(`Error in upVote function in controllers/votes.js: ${err}`);
  }
}


/**
 * @function Find member by name, increase vote if member exists, create member if member does not exist
 * 
 * @param {string} name VoteMember name
 */
function upVote(name) {
  try {
    getMemberByName([name], (result) => {
      if (result.length > 0) {
        updateVoteMember(name, (result) => {
          console.log(`Successfully upvoted ${result}`);
        });
      } else {
        createVoteMember(name, (result) => {
          console.log(`Successfully created VoteMember: ${result}`);
        });
      }
    });
  } catch (err) {
    console.log(`Error in upVote function in controllers/vote.js: ${err}`);
  }
}

module.exports = {
  upVote: upVote,
  getMembers: getMemberByName
};
