var mongoose = require('mongoose');
var Schema = mongoose.Schema;

detailSchema = new Schema({

	unique_id : Number,
	Name : String,
	Email : String,
	Message : String,
	Date : {
		type:Date,
		default:Date.now
	}
}),

Data = mongoose.model('Data', detailSchema);
module.exports = Data;
