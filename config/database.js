if(process.env.NODE_ENV === 'production'){
  module.exports = {
    mongoURI:
      "mongodb://noteuser:noteuser1998@ds125693.mlab.com:25693/projecttimetable"
  };
} else {
  module.exports = {mongoURI: 'mongodb://localhost/Galarie'}
}
