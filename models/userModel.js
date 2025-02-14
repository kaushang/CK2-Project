const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');

const userSchema = mongoose.Schema({
    phone: Number,
    username: String,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
});

module.exports = mongoose.model("user", userSchema);