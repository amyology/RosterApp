const express = require('express');
const router = express.Router();
const voteUtil = require('../controllers/vote');

/* POST members */
router.post('/', (req, res) => {
  try {
    let names = req.body.data;
    if (names.length > 0) {
      voteUtil.getMembers(names, (result) => {
        res.json(result);
      });
    } else {
      console.log('Invalid param in POST /members route in routes/members.js');
    }
  } catch (err) {
    console.log(`Error in POST /members route in routes/members.js: ${err}`);
    res.sendStatus(500);
  }
});

/* POST members/name */
router.post('/:name', (req, res) => {
  let memberName = req.params.name;
  try {
    voteUtil.upVote(memberName);
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error in POST route in routes/members.js: ${err}`);
    res.sendStatus(500);
  }
});

module.exports = router;
