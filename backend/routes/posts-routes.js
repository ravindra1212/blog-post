const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const MIME_TYPE_MAP = {
    'image/png'  : 'png',
    'image/png'  : 'png',
    'image/jpg'  : 'jpg',
    'image/jpeg' : 'jpeg'
};

const storagePath = `backend/images`;

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");

        if (isValid) {
            error = null;
        }

        cb(error, storagePath);
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name);
    }
})

// Fetch all post from DB 
router.get('/', checkAuth, (req, res, next) => {
    const pageSize    = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery   = Post.find();

    let fetchedPosts;

    if (pageSize && currentPage) { // apllying pagination logic
        postQuery.skip(pageSize * (currentPage - 1))
                 .limit(pageSize);
    }

    // Fetch all Posts
    postQuery
        .then( (collection) => {

            collection.map( data => {
                data.imagePath = data.imagePath ? `${req.protocol}://${req.get('host')}/${storagePath}/${data.imagePath} ` : '';
            });

            fetchedPosts = collection;

            return Post.count();   
        })
        .then( (count) => {

            res.status(200).json({
                data : fetchedPosts,
                totalPosts : count
            });
        });

});

// Save Post in DB
router.post('/add', checkAuth, multer({storage: storage}).single('files'), (req, res, next) => {

    const post = new Post({
        title     : req.body.title,
        body      : req.body.body,
        imagePath : req.file ? req.file.filename : ''
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
router.delete('/:postId/delete', checkAuth, (req, res, next) => {

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
router.post('/:postId/update', checkAuth, (req, res, next) => {

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