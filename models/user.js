var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user: { type: String, required: true, trim: true },
    pass: { type: String, required: true, trim: true, max: 100 }
});

var userModel = module.exports = mongoose.model('User', userSchema, "users");


module.exports.validateUser = function(userdata, callback) {
    console.log("Validate user:", userdata);
    // userModel.findOne({ user: userdata.user });
    userModel.find({ user: userdata.username }, callback);
}