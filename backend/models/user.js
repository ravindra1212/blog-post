const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const userSchema = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String,

    }
});

// Enable beautifying on this schema
userSchema.plugin(beautifyUnique);

module.exports = mongoose.model('User', userSchema);