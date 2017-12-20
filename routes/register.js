//   ┌───────────────┐
//  │   Register    │
// └───────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../config/error.js');
let bcrypt = require('bcrypt');
let User = require('../models/user.js');

router.get('/', (req, res, next) => {
    res.format({
        html: () => {
            res.render('register', { cache: true, data: [] });
        }
    });
});

router.get('/users.json', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.send(users);
    });
});

router.post('/', (req, res, next) => {
    var logindata = req.body;
    console.log("Register data", logindata);

    // User.findOne({user: logindata.username}, (err, user) => {
        
    //     if (err)
        
    //     return res.status(401).render('register', {
    //         data: {
    //             title: 'Username Taken',
    //             message: 'User already exists:' + user.username
    //         }
    //     });
    // });

    User.create({
        username: logindata.username,
        password: logindata.password,
        created_at: new Date()
    }, (err, user) => {
        if (err) res.status(500).render('register', {
            data: {
                title: 'Error',
                message: 'user not created:' + err.message
            }
        });
        else {
            res.status(200).render('register', {
                data: {
                    title: 'Success',
                    message: 'User created correctly: ' + user.username
                }
            });
        }
    });
});

module.exports = router;
