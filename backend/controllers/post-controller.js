
const Post = require('../models/post');

exports.fetchPosts = (req, res, next) => {

    const pageSize    = +req.query.pagesize;
    const currentPage = +req.query.page;
    
    // fetch only login user posts
    const postQuery   = Post.find().where('creator', req.userData.userId);

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

};

exports.createPost = (req, res, next) => {

    const post = new Post({
        title     : req.body.title,
        body      : req.body.body,
        imagePath : req.file ? req.file.filename : '',
        creator   : req.userData.userId
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
  
};

exports.updatePost = (req, res, next) => {
    
    // Check the owenership of project
    if (req.userData.userId !== req.body.creator) {

        return res.status(401).json({
            message : 'You are not authorized to update post.'
        });
    }
    
    Post.findOneAndUpdate({_id : req.params.postId}, req.body)
        .then( (updated) => {

            res.status(200).json({
                message : 'Post updated sucessfully.',
                data    : updated
            });

        })
        .catch( (error) => {

            res.status(500).json({
                error   : error,
                message : 'Post not update, Something went wrong.'
            });

        }); // Save in DB
  
}

exports.deletePost = (req, res, next) => {

    Post.deleteOne({_id : req.params.postId, creator : req.userData.userId })
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

}