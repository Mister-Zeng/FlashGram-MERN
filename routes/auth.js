const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('hello')
})

router.post('/create-account', (req, res, next) => {
    const { fullname, username, email, password } = req.body
})


module.exports = router;