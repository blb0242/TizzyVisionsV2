const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
	pid: {type: String, require: false},
	vid: {type: String, require: true},
	title: {type: String, require: true},
	description: {type: String, require: false},
	poster: {type: String, require: true},
},
{
	timestamps: true,
});

module.exports = mongoose.model("Video", videoSchema, "videos")