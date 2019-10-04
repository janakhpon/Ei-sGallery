const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const router = express.Router();

require("../../models/User");
const User = mongoose.model('users');
const validateSignup = require('../../validation/signup');

router.get('/lol', (req, res, next) => {
    
    res.json({
        LOL:"lol"
    })

    next()
});

// @route   POST api/users/signup
// @desc    Sign up for an account
// @access  Public
router.post('/lol', (req, res, next) => {
    const { errors, isValid } = validateSignup(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json({
            userexits: "email already exist"
        });
      } else {
        
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    }).catch(err =>{
        
    });

    next()
  });


  module.exports = router;
  