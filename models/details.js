var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

detailSchema = new Schema({

	unique_id : Number,
	Post_title : String,
	Post_image : String,
	Post_comment : String,
	Date : {
		type: Date,
		default:Date.now
	}
}),

Detail = mongoose.model('Detail',detailSchema);

module.exports = Detail;
