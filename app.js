//config module
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const passport = require('passport');
var multer = require('multer')
var weather = require('weather-js');
var path = require('path')
var weather = require('weather-js');
var mongoose = require('mongoose')
var colors = require('colors/safe');
var Details = require('./models/details')
var port = process.env.PORT || 3000

//connect mongo
mongoose.connect('mongodb://janakhpon:janakhponchan1998@ds125362.mlab.com:25362/mygallery');

// configure multer
var upload = multer({storage: multer.diskStorage({

  destination: function (req, file, callback) 
  { callback(null, './uploads');},
  filename: function (req, file, callback) 
  { 
  	callback(null, (file.originalname));
  }

}),

fileFilter: function(req, file, callback) {
  var ext = path.extname(file.originalname)
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.GIF' && ext !== '.JPEG') {
    return callback(/*res.end('Only images are allowed')*/ null, false)
  }
  callback(null, true)
}
});


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());







//config port
app.listen(port)
console.log(colors.yellow('\n\n\tRequesting port number ......\t\n'));
console.log(colors.yellow('\n\tRequesting server ... \t\n'));
console.log(colors.yellow('\tSuccessfully compiled application....'))
console.log(colors.yellow('\n\tApp is ready to go....'))
console.log(colors.green('\n\tGREENTECH INNOVATION GROUP(MAWLAMYINE)\t\n'))
console.log(colors.cyan('\t Name : EiGallery ❤️\n\t Developers : Ja Nakh Pon, NyanLinTun, WinWinThan, HninMoeLwin \n\t Supervisors : Daw Ei Myat Mon, Daw Than Win \n\t Language : Javascript\n\t Framework: NodeJS,Express\n\t Storage:Cloud Based, MongoDB \n'))
console.log( colors.magenta(`\t Ei'sGallery ❤️ \t is running on port -> ${port}`) )


//config route

app.get('/search',(req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('search')
    }
  })
})


app.get('/success',(req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('success')
    }
  })
})



app.get('/error',(req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('error')
    }
  })
})

app.get('/manual',(req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('manual')
    }
  })
})


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  FACEBOOK AUTH  */

const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '2162509897362005';
const FACEBOOK_APP_SECRET = 'f127700bf2c34fbfe25bb32648905974';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });




app.get('/', (req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('auth',{data:data})
    }
  })
})

app.post('/post', upload.any(), (req,res)=>{
  console.log("req.body"); //form fields
  console.log(req.body);
  console.log("req.file");
  console.log(req.files); //form files
// simple validation
if(!req.body && !req.files){
	res.json({success : false})
} else {

 var details = new Details ({

   Post_title : req.body.post_title,
   Post_image : req.files[0].filename,
   Post_comment : req.body.post_comment

 })

 details.save((err, neel)=>{
   if(err){
    console.log(err)
  }else{
    Detail.find({},(err,data)=>{
      if(err){
        console.log(err)
      }else{
        res.render('index',{data:data})
      }
    })
  }
})


}
})


app.post('/post1', function (req, res) {
  let city = req.body.city;

weather.find({search: city, degreeType: 'F'}, function(err, result) {
  if(err){
      console.log(err)
    }else{
      console.log(colors.magenta('\n\n\n\n\t\t\t\t DISPLAYING REQUESTED WEATHER FORECAST \n\n\n\n'));
      console.log(colors.blue(JSON.stringify(result, null, 2)))
      console.log(colors.magenta('\n\n\n\n\t\t\t\t END QUERIES \n\n\n\n'));
      res.render('search',)

    }
 
 


});

})



app.post('/delete',function(req,res){

   Detail.findByIdAndRemove(req.body.prodId,function(err, data) {

    console.log(data);

   })
  res.redirect('/blogs');
});

app.post('/delete1',function(req,res){

   Detail.findByIdAndRemove(req.body.prodId,function(err, data) {

    console.log(data);

   })
  res.redirect('/3dview');
});


app.get('/blogs',(req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('blogs',{data:data})
    }
  })
})

app.get('/3dview',(req,res)=>{
  Detail.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.render('3dview',{data:data})
    }
  })
})





app.get('/index',(req,res)=>{
	Detail.find({},(err,data)=>{
		if(err){
			console.log(err)
		}else{
			res.render('index',{data:data})
		}
	})
})
