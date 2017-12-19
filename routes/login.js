//   ┌───────────────┐
//  │ Login Routes  │
// └───────────────┘
const handleError = require('../config/error.js');
let bcrypt = require('bcrypt');
let User = require('../models/user.js');
const app = require('./app.js');

var session = {
    authenticated: false,
    user: ""
};

app.post('/login', (req, res, next) => {
    var logindata = req.body;
    console.log("Login data", logindata);


    User.findOne({ username : logindata.username }, (err, user) => {
        if (err)
            return res.status(401).render('index', { data: { title: 'Error', message: 'Invalid credentials' }});
        if (!user)
            return res.status(401).render('index', { data: { title: 'Error', message: 'Invalid username or password' }});

        if (user.compare(logindata.password)) {
            req.session._id = user._id;
            res.status(200).redirect("/api");
        }
    });

    // User.validateUser(logindata, (err, user) => {
    //     if (err) handleError(err);
    //     else {
    //         if (user.length > 0) {
    //             if (user[0].username == logindata.username && user[0].password == logindata.pass) {
    //                 console.log("Login successful:", logindata);
    //                 User.findOne({ user: logindata.username }, (err, res) => {
    //                     console.log("User: ", res);
    //                 });
    //                 res.status(200).redirect("/api");
    //             } else {
    //                 console.log("Invalid password:", logindata);
    //                 console.log("User:", user[0]);
    //                 res.status(401).redirect("/login");
    //             }
    //         } else {
    //             console.log("Invalid user name:", logindata);
    //             res.status(401).redirect("/login");
    //         }

    //     }
    // });

});

let loggedIn = function(req, res, next) {
    if (req.session) return next();
    else return res.redirect('/login');
};
