const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Setup Connection to DB
mongoose.set('strictQuery', true);
mongoose
    .connect("mongodb+srv://ravindra:393uX21ItLKm55w7@cluster0.pobjwhd.mongodb.net/db_blog_post?retryWrites=true&w=majority")
    .then( 
        (sucess) => {
            console.log("Connected to database.");
        },
        (error) => {
            console.log("Not connected to database.");
        }
    );

const Post = require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }))

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

// Save Post in DB
app.post('/api/add-post', (req, res, next) => {
    
    const post = new Post({
        title : 'This is first post',
        body  : 'this is test post which is created by me first time'
    });

    // Save Post in DB
    post.save()
        .then( (collection) => {
            return res.status(200).json({
                message : 'Post added sucessfully.',
                data    : collection
            });
        })
        .catch( (error) => {

            return res.status(500).json({
                message : 'Post not saved, Something went wrong.'
            });

        }); // Save in DB
  
});

// Fetch all post from DB 
app.get('/api/posts', (req, res, next) => {

    // Fetch all Posts
    Post.find()
        .then( (collection) => {
            return res.status(200).json({
                data : collection
            });
        });

});

// Delete Post Route
app.delete('/api/posts/:id', (req, res, next) => {

    Post.deleteOne({'_id' : req.params.id })
        .then( (collection) => {
            return res.status(200).json({
                message : 'Post deleted sucessfully.'
            });
        })
        .catch( 
            (error) => {
                return res.status(500).json({
                    message : 'Post not delete, Something went wrong.'
                }
            );
        });

});

module.exports = app;

