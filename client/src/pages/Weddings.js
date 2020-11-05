import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import $ from 'jquery';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    media: {
        height: 300
    }
}));

export const Weddings = () => {
    const classes = useStyles();
    const [playlists, setPlaylists] = useState(null);
    const play = "./images/play-button.png";

    const imageClick = (e) => {
        var width = $(e.target)[0].clientWidth;
        var height = $(e.target)[0].clientHeight;
        $(e.target).html('<iframe width="'+ width + '" height="' +height +'" src="https://www.youtube.com/embed/' + e.target.id + '?autoplay=1" allowfullscreen></iframe>');
    } 

    useEffect(() => {
        let isMounted = true;

        axios
			.get("/api/playlists")
            .then(playlists => {
                console.log(playlists.data)
               if (isMounted) setPlaylists(playlists.data.filter(playlist => playlist.pid === "PLf7I7Yk_q_uhmwgyjR0f_fH7Eae-TTu8h"))
            })
            .catch(console.error());

        return () => {
            isMounted = false
        }          
    },[])
    //let weddings = playlists.filter(playlist => playlist.pid === "PLf7I7Yk_q_uhmwgyjR0f_fH7Eae-TTu8h")

    return (
        <div className="weddings">
            <h1>Weddings</h1>   
            <Grid container spacing={2}>
                {
                    playlists === null ? (
                        <p>Loading...</p>
                    ) : playlists.length === 0 ? (
                        <p>No videos available</p>
                    ) : 
                    playlists.map(
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
        </div>
    )
}
