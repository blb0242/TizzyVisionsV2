const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
	channelID: {type: String, require: true},
	subscribe: {type: Boolean, require: false},
	data: {type: String, require: false}
},
{
	timestamps: true,
});

module.exports = mongoose.model("Subscribe", subscribeSchema, "subscribed")