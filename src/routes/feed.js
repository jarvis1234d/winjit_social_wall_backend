const express = require('express');
const router = express.Router();
const {fetchTweets, fetchTweetsRaw, setHastags} = require('../controllers/feedController')

/* GET users listing. */
router.get('/', fetchTweets);

router.get("/raw", fetchTweetsRaw);

router.post("/hashtags", setHastags);

module.exports = router;
