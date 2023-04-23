const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User sign Up route
 */
router.post('/signup', (req, res, next) => {

    const payload = req.body;

    bcrypt.hash(payload.password, 10).then( (hash) => {

        const user = new User({
            fname    : req.body.fname,
            lname    : req.body.lname,
            email    : req.body.email,
            password : hash
        });

        // User save in DB
        user.save()
            .then(success => {
                res.status(200).json({
                    message : 'Signup Sucessfully.',
                    result  : success 
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error   : error,
                    message : 'Something went wrong.' 
                });
            });
    });

});

/**
 * User login route
 */
router.post('/login', (req, res, next) => {

    const payload = req.body;
    let fetchUser;
    User.findOne(({email : payload.email}))
        .then(user => {

            if (!user) {
                res.status(401).json({
                    result  : user,
                    message : 'Auth failed.'
                });
            }
            fetchUser = user;
            return bcrypt.compare(payload.password, user.password)
        })
        .then(result => {

            if (!result) {
                
                res.status(401).json({
                    result  : result,
                    message : 'Auth failed.'
                });
            }

            const token = jwt.sign(
                {email : payload.email, userId : fetchUser._id},  
                'AUTH_TOKEN_SECRET', 
                {expiresIn : "1h"}
            );

            res.status(200).json({
                token  : token,
                expiresIn : 3600,
                message : 'User login sucessfully.'
            });

        }).catch(error => {
            res.status(401).json({
                result   : error,
                message  : 'Auth failed.'
            });
        });
});

module.exports = router;