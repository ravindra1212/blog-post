const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        const token = req.header('authorization').split(" "); // split after Bearer word
        jwt.verify(token[1], 'AUTH_TOKEN_SECRET');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message : 'Unauthorized access'
        });
    }
};
