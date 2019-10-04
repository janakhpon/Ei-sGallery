const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const uuid = require("uuid/v4");

const app = express();

// Load routes
const galaries = require("./routes/galarie");
const galaries_api = require("./routes/galarie-api");
const api = require('./routes/api');
const user = require('./routes/user');


// DB Config
const db = require("./config/key");

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose
  .connect(db.MONGO_URI, {
    useMongoClient: true
  })
  .then(() => console.log(`MONGODB connected on ${db.MONGO_URI}`))
  .catch(err => console.log(err));

// ejs Middleware
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//generate uuid
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  }
});
app.use(multer({ storage }).single("image"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Method override middleware
app.use(methodOverride("_method"));


//CORS
app.use(function(req,res,next){
  if (process.env.NODE_ENV === 'production') {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
} else {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
}
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-width, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();

})

// Used routes
app.use("/user/", user);
app.use("/", galaries);
app.use("/ei-gallery", galaries_api);
app.use('/api/', api);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
