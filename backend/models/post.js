const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String, 
        required : true
    },
    imagePath : {
        type : String
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId, 
        ref  : "User", 
        required : true
    }
});

module.exports = mongoose.model('Post', postSchema);