const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const Video = require('../../models/video.js');

const API_key = process.env.YOUTUBE_DATA_KEY;
const uploadsId = 'UUjFClAX21CTwdFeJGkdgTCA';
const musicVideosId = 'PLf7I7Yk_q_ugVNH4q40YaKRBLEipqvm6o';
const getPlaylistItems = "https://www.googleapis.com/youtube/v3/playlistItems";


router.get('/', (req, res) => {
    Video.find()
        .then(videos => res.json(videos))
        .catch(err => console.log(err))
})


function addVideosFromYouTubeByPlaylist(pid, maxResults) {
	let videos = []
	return axios.get(getPlaylistItems,{
		params: { 
			part: "snippet", 
			playlistId: pid,
			maxResults: maxResults, 
			key: API_key
		}
	})
	.then(response => {
		let playlistItems = response.data.items.map(video => {
			// Save video to Databse by PlaylistID
			let v = {}
			v.vid = video.snippet.resourceId.videoId
			v.title = video.snippet.title
			v.poster = video.snippet.thumbnails.maxres.url
			v.pid = video.snippet.playlistId
			return v;
			
		})
		videos.push(playlistItems)
		return videos;
	})
	.catch(err => console.log(err))

}


router.route('/test').post((req,res) => {
	addVideosFromYouTubeByPlaylist(musicVideosId, 30)
		.then(videos => {
			videos[0].map((video) => {
				Video.updateOne(
					{ vid : video.vid},
					{ $set: {
						vid : video.vid,
						title : video.title,
						poster : video.poster
					}},
					{upsert:true},
					function(error){console.log(error);}  
				);
			})
		})
		.catch(err => console.log(err))
});

router.route('/').delete((req,res) => {
	Video.deleteMany()
		.then(() => res.json('All Videos deleted!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router 
