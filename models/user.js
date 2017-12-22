const SALT_ROUNDS = 10;
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');


let userSchema = new Schema({
    username: { type: String, required: true,  unique: true },
    password: { type: String, required: true },
    created_at: Date
});

// Database Middleware to auto-hash passwords and don't save them in plain text.
userSchema.pre('save', function(next) {
    let user = this;

    if (!this.created_at) this.created_at = new Date();

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            console.log(`User password hashed: ${hash}`);
            next();
        });
    });
});

userSchema.methods.compare = function(pw) {
    return bcrypt.compareSync(pw, this.password);
};

module.exports = mongoose.model('User', userSchema, "users");
