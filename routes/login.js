//   ┌───────────────┐
//  │ Artist Routes │
// └───────────────┘
const handleError = require('../config/error.js');
var userModel = require('../models/user.js');
const app = require('./app.js');

var session = {
    authenticated: false,
    user: ""
};


// app.post('/api/artists', (req, res, next) => {
//             console.log("POST", req.originalUrl);
//             var newartist = req.body;
//             artistModel.addArtist(newartist, function(err, artist) {
//                         if (err) {
//                             console.log("Error: ", JSON.stringify(err, null, 2));
//                         } else {
//                             res.format({
//                                         json: () => {


app.post('/login', (req, res, next) => {
    var logindata = req.body;
    console.log("Login data", logindata);
    userModel.validateUser(logindata, (err, user) => {
        if (err) handleError(err);
        else {
            if (user.length > 0) {
                if (user[0].user == logindata.username && user[0].pass == logindata.pass) {
                    console.log("Login successful:", logindata);
                    userModel.findOne({ user: logindata.username }, (err, res) => {
                        console.log("User: ", res);
                    });
                    res.status(200).redirect("/api");
                } else {
                    console.log("Invalid password:", logindata);
                    console.log("User:", user[0]);
                    res.status(401).redirect("/login");
                }
            } else {
                console.log("Invalid user name:", logindata);
                res.status(401).redirect("/login");
            }

        }
    });

});