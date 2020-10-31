import React, { useState, useEffect } from "react";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from '@material-ui/lab/Skeleton';
import $ from 'jquery';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    media: {
        height: "400px"
    }
}));


export default function Home() {
    // const { loading = false } = props;
    const [homeVideo, setHomeVideo] = useState(null);
    const classes = useStyles();
    const play = "./images/play-button.png";

    const imageClick = (e) => {
        var width = $(e.target)[0].clientWidth;
        var height = $(e.target)[0].clientHeight;
        $(e.target).html('<iframe width="'+ width + '" height="' +height +'" src="https://www.youtube.com/embed/' + e.target.id + '?autoplay=1" frameBorder="0" allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            
    } 
    useEffect(() => {
        axios
            .get("https://tizzy-visions-v2.herokuapp.com/api/playlists")
                .then(reel => {
                    console.log(reel.data)
                    reel.data.map((playlist) => {
                        console.log(playlist.videos.filter(video => video.vid === "HIJF8pBIkZE"))
                        return playlist.pid === "PLf7I7Yk_q_ugMGbUVDDuxEDAtFYlF9M52" ? setHomeVideo(playlist.videos.filter(video => video.vid === "HIJF8pBIkZE")) : null;
                    })
                })
            .catch(console.error());
        
        
    }, [])
    
    return (
        <>       
            {
                homeVideo === null ? 
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid 
                        item 
                        xs={12}
                    >
                        <Skeleton variant="rect" height={400}/> 
                    </Grid>
                </Grid>
                 : homeVideo.length === 0 ? (
                    <p>No video available</p>
                ) :  
                homeVideo.map(v => 
                v.poster && (
                        <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            key={v._id}
                        >
                            <Grid 
                                item 
                                xs={12}
                            >
                                <Card 
                                    onClick={imageClick}
                                >
                                    <CardMedia
                                        className={classes.media}
                                        image={v.poster}
                                        title={v.title}
                                        id={v.vid}
                                    />
                                </Card>
                            </Grid>
                        </Grid>        
                ))
            }            
        </>         
        
    );
}
