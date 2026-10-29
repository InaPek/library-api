const express = require('express');
const router = express.Router();
const User = require('../../classes/User');

router.post('/login', (req, res) => {
    const user = User.login();
    res.status(201).json(user);
});

module.exports = router;
