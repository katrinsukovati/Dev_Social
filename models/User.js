// Create a user model using a schema
// A Mongoose schema defines the structure of the document, default values, validators, etc.
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // We dont want to have two users with the same email
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    // Attach a profile image to your email
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

// Exporting a mongoose model
// A Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
module.exports = User = mongoose.model('user', UserSchema);