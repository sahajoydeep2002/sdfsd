const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Connected to the API');
});

module.exports = router;
