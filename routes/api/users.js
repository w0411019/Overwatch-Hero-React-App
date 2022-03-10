var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var userReg = require('../../models/userReg');
var userLogin = require('../../models/userLogin')



router.post('/register',(req, res)=>{

  userReg.create(req.body, (err, savedUser)=>{
      if(err){
          return res.status(400).send();
      }

      savedUser.password = bcrypt.hashSync(req.body.password, 10)

      savedUser.save(function (err){
        if (err) console.log(err)
      })

      var info = { email: savedUser.email, id: savedUser._id}

      jwt.sign({email: savedUser.email}, process.env.SECRET_KEY, (err, token)=>{
        res.header('Access-Control-Expose-Headers','x-auth-token')
        res.header('x-auth-token', token);
        res.status(201).send(info);
    })
  })
})


router.post('/login', (req,res)=>{

  userLogin.findOne( {email: req.body["email"]}, function(err, user){
    if(err){
      return res.status(400).send();
    }
    else if(!user){
      return res.status(404).send();
    }
    else if(!bcrypt.compareSync(req.body["password"],user.password)){
        res.status(404).send();
    }
    else{
      jwt.sign({email: user.email}, process.env.SECRET_KEY, (err, token)=>{
        
      res.header('Access-Control-Expose-Headers','x-auth-token')
      res.header('x-auth-token', token);
      res.status(200).send();
    })
    }
  })
})

module.exports = router;
