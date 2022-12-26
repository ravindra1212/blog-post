const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }))

app.use( (req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin", "*"
    );

    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X_Requested-With, Content-Type Accept"
    );

    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();
});


app.use('/api/add-post', (req, res, next) => {

    const post = req.body;

    return res.status(200).json({
        message : 'Post added sucessfully.',
    });

});


app.use('/api/posts', (req, res, next) => {

    const posts = [
        {
            id : 1,
            title : 'First server side post',
            body : 'This is comming from server'
        },
        {
            id : 2,
            title : 'Second server side post',
            body : 'This is comming from server'
        },
        {
            id : 3,
            title : 'Third server side post',
            body : 'This is comming from server'
        }
    ];

    return res.status(200).json({
        message : 'Posts fetched sucessfully.',
        posts   : posts
    });

    // res.send('Hello from express..!!');

});

module.exports = app;

