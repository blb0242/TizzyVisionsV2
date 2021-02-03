const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const Subscription = require('../../models/youtube.js');


const API_key = process.env.YOUTUBE_DATA_KEY;
const uploadsId = 'UUjFClAX21CTwdFeJGkdgTCA';
const musicVideosId = 'PLf7I7Yk_q_ugVNH4q40YaKRBLEipqvm6o';
const getPlaylistItems = "https://www.googleapis.com/youtube/v3/playlistItems";


router.get('/', (req, res) => {
    //res.send(req.query.hub.challenge)
    res.status(200).send(req.query['hub.challenge'])
    console.log(res)
    Subscription.updateOne(
        { channelID : 'UCOh4avN_YMs3JcUgBVhJfGg'},
        { $set: {
            subscribe : true,
            data: res
        }},
        {upsert:true},
        function(error){console.log(error);}  
    );
    
})

router.post('/', (req, res) => {
    //res.send(req.query.hub.challenge)
    console.log(res)
    res.json({
        "day":"Monday"
    })
    
    
})


module.exports = router 
