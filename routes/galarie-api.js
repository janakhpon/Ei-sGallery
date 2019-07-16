const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Load Galarie Model

require("../models/galarie");

const Galarie = mongoose.model("galarie");

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  }),

  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".PNG" &&
      ext !== ".JPG" &&
      ext !== ".GIF" &&
      ext !== ".JPEG"
    ) {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  }
});

// GET request
router.get("/list", (req, res) => {
  Galarie.find()
    .sort({ date: "desc" })
    .then(galaries => res.json(galaries)).catch(err => res.status(404).json({Null : "NO DATA FOUND"}));
});




module.exports = router;
