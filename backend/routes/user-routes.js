const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/user-controller');

/**
 * User sign Up route
 */
router.post('/signup', UserController.createUser);

/**
 * User login route
 */
router.post('/login', UserController.userLogin);


module.exports = router;