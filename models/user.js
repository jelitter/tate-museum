var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user: { type: String, trim: true },
    pass: { type: String, trim: true, max: 100 }
});

var userModel = module.exports = mongoose.model('user', userSchema, "users");


module.exports.validateUser = function(userdata, callback) {
    console.log("Validate user:", userdata);
    // userModel.findOne({ user: userdata.user });
    userModel.find({ user: userdata.username }, callback);
}