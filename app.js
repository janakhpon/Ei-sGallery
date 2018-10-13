//config module
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var passport1 = require("passport");
var passport2 = require("passport");
var multer = require("multer");
var weather = require("weather-js");
var path = require("path");
var weather = require("weather-js");
var mongoose = require("mongoose");
var colors = require("colors/safe");
var Details = require("./models/details");
var Data = require("./models/datas");
var Strategy = require("passport-local").Strategy;
var Strategyf = require("passport-facebook").Strategy;
var Strategyt = require('passport-twitter').Strategy;
var db = require("./db");
var port = process.env.PORT || 3000;

//connect mongo
mongoose.connect(
  "mongodb://janakhpon:janakhponchan1998@ds125362.mlab.com:25362/mygallery"
);

// configure multer
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  }),

  fileFilter: function (req, file, callback) {
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
      return callback( /*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  }
});

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("uploads"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({
  extended: true
}));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//config port
app.listen(port);
console.log(colors.yellow("\n\n\tRequesting port number ......\t\n"));
console.log(colors.yellow("\n\tRequesting server ... \t\n"));
console.log(colors.yellow("\tSuccessfully compiled application...."));
console.log(colors.yellow("\n\tApp is ready to go...."));
console.log(colors.green("\n\tGREENTECH INNOVATION GROUP(MAWLAMYINE)\t\n"));
console.log(
  colors.cyan(
    "\t Name : EiGallery ❤️\n\t Developers : Ja Nakh Pon, NyanLinTun, WinWinThan, HninMoeLwin \n\t Supervisors : Daw Ei Myat Mon, Daw Than Win \n\t Language : Javascript\n\t Framework: NodeJS,Express\n\t Storage:Cloud Based, MongoDB \n"
  )
);
console.log(
  colors.magenta(`\t Ei'sGallery ❤️ \t is running on port -> 127.0.0.1:${port}`)
);



//Starting facebook auth
passport1.use(new Strategyf({
    clientID: '2162509897362005',
    clientSecret: 'f127700bf2c34fbfe25bb32648905974',
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));


passport1.serializeUser(function (user, cb) {
  cb(null, user);
});

passport1.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get('/login/facebook',
  passport1.authenticate('facebook'));

app.get('/login/facebook/return',
  passport1.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/profile');
  });

//Ending facebook auth

//Starting twitter auth


passport2.use(new Strategyt({
    consumerKey: 'BQousff3h4Glk0tX8yh8eoyHZ',
    consumerSecret: 'lVi4JGrhIa4rXMbfDRfpuv77nLaZ2fMMdac33qOftCy8WbuBf7',
    callbackURL: 'http://127.0.0.1:3000/login/twitter/callback'
  },
  function (token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport2.serializeUser(function (user, cb) {
  cb(null, user);
});

passport2.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/profile');
  });

//Ending twitter auth

// Start Local Passport

passport.use(
  new Strategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }

      return cb(null, user);
    });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});


passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});


app.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/error1"
  }),
  function (req, res) {
    res.redirect("/profile");
  }
);

//Ending Local passport






// Set Default path
app.get("/", function (req, res) {
  res.render("login");
});



//set Logout path
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


//set Profile for three auth
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {
      user: req.user
    });
  });




//set forecast path
app.get("/forecast", (req, res) => {
  res.render("forecast");
});



//manaul
app.get("/manual", (req, res) => {
  res.render("manual");
});

//report
app.get("/report", (req, res) => {
  res.render("report");
});


//set error path
app.get("/error", (req, res) => {
  Detail.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("error");
    }
  });
});


//set error1 path
app.get("/error1", (req, res) => {
  Detail.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("space");
    }
  });
});



//set manual path
app.get("/userlist", (req, res) => {
  res.render("userlist");
});


//set manual path
app.get("/manual", (req, res) => {
  res.render("manual");
});


//set upload path
app.post("/post", upload.any(), (req, res) => {
  console.log("req.body"); //form fields
  console.log(req.body);
  console.log("req.file");
  console.log(req.files); //form files
  // simple validation
  if (!req.body && !req.files) {
    res.render("error");
    res.json({
      success: false
    });

  } else {
    var details = new Details({
      Post_title: req.body.post_title,
      Post_image: req.files[0].filename,
      Post_comment: req.body.post_comment
    });

    details.save((err, neel) => {
      if (err) {
        res.render("error");
        console.log(err);
      } else {
        Detail.find({}, (err, data) => {
          if (err) {
            res.render("error");
            console.log(err);

          } else {
            res.render("index", {
              data: data
            });
          }
        });
      }
    });
  }
});


//set request forecast path
app.post("/post1", function (req, res) {
  let city = req.body.city;
  var status = "success, check it in terminal or console";

  weather.find({
      search: city,
      degreeType: "F"
    },
    function (err, result) {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        console.log(
          colors.magenta(
            "\n\n\n\n\t\t\t\t DISPLAYING REQUESTED WEATHER FORECAST \n\n\n\n"
          )
        );
        console.log(colors.blue(JSON.stringify(result, null, 2)));
        console.log(colors.magenta("\n\n\n\n\t\t\t\t END QUERIES \n\n\n\n"));

      }
    }



  );
  res.render('forecast');

});


//Report options
app.post('/post2', (req, res) => {

  if (!req.body) {
    res.json({
      success: false
    })
  } else {

    var datas = new Data({

      Name: req.body.Name,
      Email: req.body.Email,
      Message: req.body.Message
    })

    datas.save((err, neel) => {
      if (err) {
        console.log(err)
      } else {
        Data.find({},(err,data)=>{
					if(err){
						console.log(err)
					}else{
						res.render('userlist',{data:data})
					}
				})
      }
    })


  }
})

//End


//set delete path
app.post("/delete", function (req, res) {
  Detail.findByIdAndRemove(req.body.prodId, function (err, data) {
    console.log(data);
  });
  res.redirect("/blogs");
});




//set editable blogs path
app.get("/blogs", (req, res) => {
  Detail.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.render("error");

    } else {
      res.render("blogs", {
        data: data
      });
    }
  });
});

//set editable blogs path
app.get("/single", (req, res) => {
  Detail.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("single", {
        data: data
      });
    }
  });
});



//set index path
app.get("/index", (req, res) => {
  Detail.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("index", {
        data: data
      });
    }
  });
});
