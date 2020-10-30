
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
	pid: {type: String, require: true},
	title: {type: String, require: true},
	videos: { type : Array , "default" : ["Video"] }
},
{
	timestamps: true,
});

module.exports = mongoose.model("Playlist", playlistSchema, "playlists")