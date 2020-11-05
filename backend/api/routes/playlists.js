const axios = require('axios');
const express = require('express');
const router = express.Router()
require('dotenv').config();
const Playlist = require('../../models/playlist.js');
const Video = require('../../models/video.js');

const API_key = process.env.YOUTUBE_DATA_KEY;
const channelId = 'UCjFClAX21CTwdFeJGkdgTCA';
const uploadsId = 'UUjFClAX21CTwdFeJGkdgTCA';
const maxPlaylistResults = 15;
let maxVideoResults = 5;
const getPlaylists = "https://www.googleapis.com/youtube/v3/playlists";
const getPlaylistItems = "https://www.googleapis.com/youtube/v3/playlistItems";
const subs = [];

// let checkYTPlaylist = async () => {
// 	let response = await axios.get(getPlaylists,{
// 		params: { 
// 			part: "snippet", 
// 			channelId: channelId, 
// 			maxResults: 20, 
// 			key: API_key
// 		}
// 	})
// 	.then(res => {return res.data.items})
// 	.then(res => {
// 		res.map((item) => {
// 			axios.get(getPlaylistItems,{
// 				params: { 
// 					part: "snippet", 
// 					playlistId: item.id,
// 					maxResults: 10, 
// 					key: API_key
// 				}
// 			})
// 			.then(res => console.log(res.data.items))
// 			.catch(err => console.log(err))
// 		})
// 	})
// 	.catch(err => console.log(err))
// }

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("a7de3c26204cd67ddfc99c3b4fdbb8f4414f6a1e", "mP/B4lnj1pSkrEe6Jao2qAvVxqwuH4aD5Su+QIaw72sKXpVgkzqlJHwhZiVuOkZX64BraMhixS3OvmYhmBfFdClOlT6v2QkpRIW1fqVUgVo5Xrnl4HT12igiH19DUNuo", "f0d974910a00caa82993c3d6337f7db1");

let checkVimeo = () => {
	client.request({
		method: 'GET',
		path: '/users/42598193/videos'
	  }, function (error, body, status_code, headers) {
		if (error) {
		  console.log(error);
		}
	  
		console.log(body);
	  })
}



router.get('/', (req, res) => {
    Playlist.find()
		.then(playlists => res.json(playlists))
        .catch(err => console.log(err))
})


async function getPlaylistsInfo () {
	let ytPlaylists, playlists;
  	let response = await axios.get(getPlaylists,{
		params: { 
			part: "snippet", 
			channelId: channelId, 
			maxResults: maxPlaylistResults, 
			key: API_key
		}
	})
	.then(function (response) {
		let items = response.data.items;
		playlists = [];
		items.forEach(item => {
			const title = item.snippet.title;
			const pid = item.id;
			const testSubs = subs.some(el => title.includes(el));
			let playlist = {}

			if (!testSubs) {
				playlist.id = pid;
				playlist.title = title;
				playlists.push(playlist)
				
			}
		})
		return playlists;
	})
	.then(function (playlists) {
		ytPlaylists = playlists.map(pl => pl.id) // YT Playlists IDs
		playlists.map(pl => {
			const list = pl
			pl = pl.id
			Playlist.find({ "pid": list.id })
				.then(p => {
					//console.log(p)
					// If there isnt a DB Playlist forEach YT Playlist, 
					if (p === undefined || p.length == 0) {
						// Add Playlist to Database
						const newPlaylist = new Playlist({
							pid : list.id,
							title : list.title
						});
						newPlaylist.save()
							.then(p => {
								console.log(`playlist saved`)
							})
							.catch(err => console.log('Error: ' + err));
					}
				})
				.catch(err => console.log(err));
		})

		return ytPlaylists;
	})
	.catch(err => console.log(err));
	
	// Add Videos by Id
	response.forEach(pid => {
		pid === "PLf7I7Yk_q_ugMGbUVDDuxEDAtFYlF9M52" ? maxVideoResults = 20 : maxVideoResults = maxVideoResults;
		setTimeout(function(){
			addVideosFromYouTubeByPlaylist(pid, maxVideoResults)
				.then(videos => {
					Playlist.updateOne(
						{ pid : pid},
						{ $set: { videos: videos[0]}},
						function(error){console.log(error);}  
					);
				})
				.catch(err => console.log(err))
			
		}, 1000);
	})
	
}

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
		//console.log(response.data.items[0]);
		let playlistItems = response.data.items.map(video => {
			// Save video to Databse by PlaylistID
			let v = {}
			v.vid = video.snippet.resourceId.videoId
			v.title = video.snippet.title
			v.poster = video.snippet.thumbnails.maxres.url
			v.pid = video.snippet.playlistId
			//console.log(v)

			return v;
			
		})
		videos.push(playlistItems)
		return videos;
	})
	.catch(err => console.log(err))

}

router.route('/:id/:maxResults').get((req,res) => {

	// Playlist.find()
    //     .then(playlists => res.json(playlists))
    //     .catch(err => console.log(err))
	
	res.json()
	console.log(req.params.id)
	console.log(req.params.maxResults)
});


router.route('/update/:id').put((req,res) => {
	
	let a = Playlist.updateOne({ pid: req.params.id }, 
	{
		videos: ["yo1"]
	},function(error){console.log(error);})
	console.log(a)
});

router.route('/addYouTube').post((req,res) => {
	getPlaylistsInfo();
});

router.route('/checkYTPlaylist').get((req,res) => {
	checkYTPlaylist();
});

router.route('/checkVimeo').get((req,res) => {
	checkVimeo();
});
module.exports = router 
