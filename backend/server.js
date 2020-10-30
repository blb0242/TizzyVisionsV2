const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('./database');


app.use(bodyParser.json());
app.use(cors());

// API
const playlists = require('./api/routes/playlists');
const videos = require('./api/routes/videos');
app.use('/api/playlists', playlists);
app.use('/api/videos', videos);

app.get('/', (req, res) => {
    console.log("HIIIIIIII")
})


app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5020;
app.listen(port, () => {

    

    console.log(`Server started on port ${port}`);
});