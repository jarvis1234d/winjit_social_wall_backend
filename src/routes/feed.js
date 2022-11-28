const express = require('express');
const router = express.Router();
const {fetchTweets, fetchTweetsRaw} = require('../controllers/feedController')

/* GET users listing. */
router.get('/', fetchTweets);

router.get("/raw", fetchTweetsRaw);

module.exports = router;
