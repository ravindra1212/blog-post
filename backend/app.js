const path = require('path'); // directory path
const express = require('express'); // express framework
const bodyParser = require("body-parser"); // Middleware in NodeJs
const mongoose = require("mongoose"); // DB Query

// Load Required Routes Files
const postRoutes = require('./routes/posts-routes');
const userRoutes = require('./routes/user-routes');


const cors = require('cors'); // For Development purpose only
const app = express();

// Setup Connection to DB
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ravindra-admin:ravi12mongodb@cluster0.pobjwhd.mongodb.net/db_blog_post?retryWrites=true&w=majority").then( 
        (sucess) => {
            console.log("Connected to database.");
        },
        (error) => {
            console.log("Not connected to database.");
        }
    );

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : false }));
app.use("/images", express.static(path.join("/backend/images"))); // Provisinf access of backend/images folder
app.use( (req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin", "*"
    );

    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();

});

app.use(cors());

app.use("/api/posts", postRoutes); // attch posts routes
app.use("/api/user", userRoutes); // attch users routes

module.exports = app;


