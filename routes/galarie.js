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

// Galarie Index Page
router.get("/", (req, res) => {
  Galarie.find()
    .sort({ date: "desc" })
    .then(galaries => {
      res.render("index", {
        galaries: galaries
      });
    });
});

// Galarie JSON Page
router.get("/", (req, res) => {
  Galarie.find()
    .sort({ date: "desc" })
    .then(galaries => {
      res.render("index", {
        galaries: galaries
      });
    });
});


// Galarie Index Page
router.get("/admin", (req, res) => {
  Galarie.find()
    .sort({ date: "desc" })
    .then(galaries => {
      res.render("index", {
        galaries: galaries
      });
    });
});

// Add Galarie Form
router.get("/add", (req, res) => {
  res.render("index");
});

// Edit Galarie Form
router.get("/edit/:id", (req, res) => {
  Galarie.findOne({
    _id: req.params.id
  }).then(galarie => {
    res.render("index", {
      galarie: galarie
    });
  });
});

//Process
router.post("/", async (req, res) => {
  const galarie = new Galarie();
  galarie.type = req.body.type;
  if (typeof req.body.keyword !== "undefined") {
   galarie.keyword = req.body.keyword.split(",");
  }
  galarie.image = "/img/" + req.file.filename;
  galarie.mimetype = req.file.mimetype;
  //image.description = req.body.description;
  //image.filename = req.file.filename;
  //image.path = "/img/uploads/" + req.file.filename;
  //image.originalname = req.file.originalname;
  //image.mimetype = req.file.mimetype;
  //image.size = req.file.size;

  await galarie.save();
  res.redirect("/");
});


// Process Form
//router.post("/", upload.any(), (req, res) => {
  //const newUpload = {};
  //newUpload.type = req.body.type;
  //newUpload.image = req.files[0].filename;
 // if (typeof req.body.keyword !== "undefined") {
   // newUpload.keyword = req.body.keyword.split(",");
 // }

  //new Galarie(newUpload).save().then(galarie => {
    //res.redirect("/");
  //});
//});

// @route   GET api/tasks/:id
// @desc    Get task by id
// @access  Public
router.post("/keyword/:keyword1", (req, res) => {
  Galarie.find({ keyword: { $regex: ".*" + req.params.keyword1 + ".*" } })
    .limit(15)
    .then(galaries => {
      res.render("index", {
        galaries: galaries
      });
      console.log(galaries);
    })
    .catch(err =>
      res.status(404).json({ notaskfound: "No task match with that word" })
    );
});

// @route   GET api/tasks/:id
// @desc    Get task by id
// @access  Public
router.get("/:sort", (req, res) => {
  if (req.params.sort == 'DATE') {
    res.redirect('/');
  } else {
     Galarie.find({ type: { $regex: ".*" + req.params.sort + ".*" } })
       .limit(15)
       .then(galaries => {
         res.render("index", {
           galaries: galaries
         });
         console.log(galaries);
       })
       .catch(err =>
         res
           .status(404)
           .json({ notaskfound: "No task match with that word" })
       );
  }
 
});





// Edit Form process
router.put("/:id", (req, res) => {
  Galarie.findOne({
    _id: req.params.id
  }).then(galarie => {
    galarie.title = req.body.title;
    galarie.details = req.body.details;

    galarie.save().then(galarie => {
      res.redirect("/");
    });
  });
});

// Delete Galarie
router.delete("/:id", (req, res) => {
  Galarie.remove({ _id: req.params.id }).then(() => {
    res.redirect("/");
  });
});

module.exports = router;
