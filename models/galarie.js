const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const galarieSchema = new Schema({
  type:{
    type: String,
    required: true
  },
  keyword:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('galarie', galarieSchema);
