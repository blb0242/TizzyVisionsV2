import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import $ from 'jquery';

const useStyles = makeStyles(theme => ({
    media: {
        height: 300
    }
}));

export const Vlogs = () => {
    const classes = useStyles();
    const [playlists, setPlaylists] = useState([]);
    const play = "./images/play-button.png";

    const imageClick = (e) => {
        var width = $(e.target)[0].clientWidth;
        var height = $(e.target)[0].clientHeight;
        console.log($(e.target))
        $(e.target).html('<iframe width="'+ width + '" height="' +height +'" src="https://www.youtube.com/embed/' + e.target.id + '?autoplay=1" allowfullscreen></iframe>');
    } 

    useEffect(() => {
        let isMounted = true;

        fetch("https://tizzy-visions-v2.herokuapp.com/api/playlists")
            .then(res => res.json())
            .then(ytPlaylists => {
               if (isMounted) setPlaylists(ytPlaylists)
            })
            .catch(console.error());

        return () => {
            isMounted = false
        }          
    },[playlists])

    let vlogs = playlists.filter(playlist => playlist.pid === "PLf7I7Yk_q_ujecZCX_mMvXGbOu2SN6G4h")
    
    return (
        <>
            <h1>Vlogs</h1>   
            
            <Grid container spacing={2}>
                {
                    vlogs === null ? (
                        <p>Loading...</p>
                    ) : vlogs.length === 0 ? (
                        <p>No videos available</p>
                    ) : 
                    vlogs.map(
                        p => p.videos && (
                            p.videos.map(v => 
                                <Grid key={v.vid} item xs={12} sm={6}>
                                    <Card className={classes.card}
                                        onMouseEnter = {() => {
                                            const cursor = $(".cursor")
                                            cursor.css({
                                                transform: "scale(3.2)",
                                                'background-image': `url(${play})`
                                            })
                                        }}
                                        onMouseLeave = {() => {
                                            const cursor = $(".cursor")
                                            cursor.css({
                                                transform: "scale(1)",
                                                'background-image': "unset"
                                            })
                                        }}
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
                            )
                            
                        )
                    )
                }
            </Grid>
        </>
    )
}
