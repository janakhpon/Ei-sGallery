const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
require('../../models/galarie');

const Galarie = mongoose.model('galarie');

// list all the data
router.get('/list', (req, res) => {
    Galarie.find().sort({date:'desc'}).then(galaries => {
        res.json(galaries);
    });
});

// list all the data by type
router.get("/type/:type", (req, res) => {  
    Galarie.find({ type: { $regex: ".*" + req.params.type + ".*" } })
       .limit(15)
       .then(galaries => {
         res.json(galaries);
         console.log(galaries);
       })
       .catch(err =>
         res
           .status(404)
           .json({ notaskfound: "No task match with that word" })
       );
  });


  // list all the data by type using post
router.post("/type", (req, res) => {  
    Galarie.find({ type: { $regex: ".*" + req.body.type + ".*" } })
       .limit(15)
       .then(galaries => {
         res.json(galaries);
         console.log(galaries);
       })
       .catch(err =>
         res
           .status(404)
           .json({ notaskfound: "No task match with that word" })
       );
  });


  // list all the data by keyword
router.get("/keyword/:keyword", (req, res) => {  
    Galarie.find({ keyword: { $regex: ".*" + req.params.keyword + ".*" } })
       .limit(15)
       .then(galaries => {
         res.json(galaries);
         console.log(galaries);
       })
       .catch(err =>
         res
           .status(404)
           .json({ notaskfound: "No task match with that word" })
       );
  });


    // list all the data by keyword using post
router.post("/keyword", (req, res) => {  
    Galarie.find({ keyword: { $regex: ".*" + req.body.keyword + ".*" } })
       .limit(15)
       .then(galaries => {
         res.json(galaries);
         console.log(galaries);
       })
       .catch(err =>
         res
           .status(404)
           .json({ notaskfound: "No task match with that word" })
       );
  });




module.exports = router;