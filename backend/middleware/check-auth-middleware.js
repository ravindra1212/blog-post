const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        const token = req.header('authorization').split(" "); // split after Bearer word
        const decodedToken = jwt.verify(token[1], process.env.JWT_KEY);
        req.userData = {email : decodedToken.email, userId : decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({
            message : 'You are not authenticated...!!'
        });
    }
};
