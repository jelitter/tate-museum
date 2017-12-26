const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).render('doc', {
        cache: true,
        data: {
            username: req.session.username || '',
            pagename: 'Doc',
            cartItems: req.session.cartItems || 0
        },
    });
});

module.exports = router;