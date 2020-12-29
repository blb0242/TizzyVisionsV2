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
    req.json()
})


module.exports = router 
