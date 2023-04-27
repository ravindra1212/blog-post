const User = require('./../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {

    const payload = req.body;

    bcryptjs.hash(payload.password, 10).then( (hash) => {

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

}

exports.userLogin = (req, res, next) => {

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
            return bcryptjs.compare(payload.password, user.password)
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
                process.env.JWT_KEY, 
                {expiresIn : "1h"}
            );

            res.status(200).json({
                data   : {
                    token     : token,
                    expiresIn : 3600,
                    user      : fetchUser
                },
                message : 'User login sucessfully.'
            });

        }).catch(error => {
            res.status(401).json({
                result   : error,
                message  : 'Auth failed.'
            });
        });
}