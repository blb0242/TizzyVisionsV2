import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.css';



const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 600,
        height: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    media: {
        height: 300
    }
}));


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export default function ModalComponent(props) {
    const classes = useStyles();

    const [title, setTitle] = useState(props.playlistName);
    const [description, setDescription] = useState(props.playlist[props.video].title);
    const [modalStyle] = useState(getModalStyle);
    
    const selectVideo = (index) => {
        console.log(props.playlist )
        setDescription(props.playlist[index].title)
        setTitle(props.playlist.title)
    }

    return (
        <>
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">{title ? title : "Music Videos"}</h2>
                <p id="simple-modal-description">{description }</p>
                <Grid container spacing={2}>
                    <Grid key={props.playlist._id} item xs={12}>
                        <Card >
                            <Carousel showArrows={true} selectedItem={props.video} dynamicHeight={true} onClickThumb={selectVideo}>
                                {props.playlist.map((video, index) => 
                                    (
                                        <div key={video.title}>
                                            <iframe
                                                title={video.title}
                                                id={video._id}
                                                style={{position:"absolute", width:"100%", margin:0}}
                                                src={"https://www.youtube.com/embed/" + video.vid /*+ (index === props.video ? "?autoplay=1" : "")*/}
                                                frameBorder="0"
                                                allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                            <img alt={video.title} style={{zIndex:-9999}} src={video.poster ? video.poster : null} />
                                            {console.log(index === props.video)}
                                        </div>
                                    )
                                )}   
                            </Carousel>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            
        </>
    );
}
