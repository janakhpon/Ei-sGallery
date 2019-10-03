const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    whichpart: {
        type: String
    },
    reason : {
        type: String
    },
    shouldbe:{
        type: String
    },
    priority:{
        type: String
    },
    vote:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);