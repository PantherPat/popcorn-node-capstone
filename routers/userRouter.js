const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('authenticated, yo!, in userRouter.js line 5');
    res.json({message: 'You shall pass!'});
});

module.exports = router;