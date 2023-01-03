const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

// Setup Connection to DB
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ravindra-admin:ravi12mongodb@cluster0.pobjwhd.mongodb.net/db_blog_post?retryWrites=true&w=majority").then( 
        (sucess) => {
            console.log("Connected to database.");
        },
        (error) => {
            console.log("Not connected to database.");
        }
    );

const Post = require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use( (req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin", "*"
    );

    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();
});

app.use(cors());

// Save Post in DB
app.post('/api/add-post', (req, res, next) => {
    
    const post = new Post({
        title : req.body.title,
        body  : req.body.body
    });

    // Save Post in DB
    post.save()
        .then( (collection) => {
            res.status(200).json({
                message : 'Post added sucessfully.',
                data    : collection
            });
        })
        .catch( (error) => {

            res.status(500).json({
                message : 'Post not saved, Something went wrong.'
            });

        }); // Save in DB
  
});

// Fetch all post from DB 
app.get('/api/posts', (req, res, next) => {

    // Fetch all Posts
    Post.find()
        .then( (collection) => {
            res.status(200).json({
                data : collection
            });
        });

});

// Delete Post Route
app.delete('/api/post-delete/:postId', (req, res, next) => {

    Post.deleteOne({'_id' : req.params.postId })
        .then( (collection) => {
            res.status(200).json({
                message : 'Post deleted sucessfully.'
            });
        })
        .catch( 
            (error) => {
                res.status(500).json({
                    message : 'Post not delete, Something went wrong.'
                }
            );
        });

});

// Update Post in DB
app.post('/api/update-post/:postId', (req, res, next) => {

    Post.findOneAndUpdate({'_id' : req.params.postId }, req.body)
        .then( (updated) => {
            res.status(200).json({
                message : 'Post updated sucessfully.',
                data    : updated
            });
        })
        .catch( (error) => {

            res.status(500).json({
                message : 'Post not update, Something went wrong.'
            });

        }); // Save in DB
  
});

module.exports = app;

