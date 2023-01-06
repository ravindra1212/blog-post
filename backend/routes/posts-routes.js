const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Fetch all post from DB 
router.get('/', (req, res, next) => {

    // Fetch all Posts
    Post.find()
        .then( (collection) => {
            res.status(200).json({
                data : collection
            });
        });

});

// Save Post in DB
router.post('/add', (req, res, next) => {
    
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

// Delete Post Route
router.delete('/:postId/delete', (req, res, next) => {

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
router.post('/:postId/update', (req, res, next) => {

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

module.exports = router;