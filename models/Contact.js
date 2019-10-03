const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    purpose: {
        type: String,
        required: true
    },
    availableat:{
        type: Date
    },
    address:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);

