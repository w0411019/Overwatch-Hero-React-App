var express = require('express');
var router = express.Router();

//kind of a sub router

var usersRouter = require('./users');
router.use('/users', usersRouter);

var heroRouter = require("./heroes");
router.use('/heroes', heroRouter);


//create an endpoint to handle /
router.get('/', (req, res)=> {
    res.header('x-mycustom-header', 'hello from a header')
    res.send("Welcome to the api!!!")
})



module.exports = router;