const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
require('../../models/galarie');

const Galarie = mongoose.model('galarie');

// list all the data
router.get('/list', (req, res) => {
  Galarie.find().sort({ date: 'desc' }).then(galaries => {
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
        .status(204)
        .json({ Notfound: "No image found" })
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
        .status(204)
        .json({ Notfound: "No image found" })
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
        .status(204)
        .json({ Notfound: "No image found" })
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
        .status(204)
        .json({ Notfound: "No image found" })
    );
});


//Update image to Galarie
router.post("/upload", async (req, res) => {
  const galarie = new Galarie();
  galarie.type = req.body.type;
  if (typeof req.body.keyword !== "undefined") {
    galarie.keyword = req.body.keyword.split(",");
  }
  galarie.image = "/img/" + req.file.filename;
  galarie.mimetype = req.file.mimetype;
  await galarie.save();
  res.status(201).json({
    Created: "Uploaded to Gallery"
  })
});



// Update with params id
router.put("/update/:id", (req, res) => {
  Galarie.findOne({
    _id: req.params.id
  }).then(galarie => {
    galarie.title = req.body.title;
    galarie.details = req.body.details;

    galarie.save().then(galarie => {
      res.status(201).json({
        Updated: "Updated to Gallery"
      })
    });
  });
});


// Upadate without params
router.put("/update", (req, res) => {
  Galarie.findOne({
    _id: req.body.id
  }).then(galarie => {
    galarie.title = req.body.title;
    galarie.details = req.body.details;

    galarie.save().then(galarie => {
      res.status(201).json({
        Updated: "Updated to Gallery"
      })
    });
  });
});


// Delete image from Galarie
router.delete("/delete", (req, res) => {
  Galarie.remove({ _id: req.body.id }).then(() => {
    res.status(200).json({
      Deleted : "Deleted from Gallery"
    })
  });
});

// Delete image from Galarie
router.delete("/delete/:id", (req, res) => {
  Galarie.remove({ _id: req.params.id }).then(() => {
    res.status(200).json({
      Deleted : "Deleted from Gallery"
    })
  });
});


module.exports = router;