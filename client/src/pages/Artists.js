import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import ModalComponent from "../components/ModalComponent";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { GridListTileBar } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
    media: {
        height: 300
    }
}));

export default function Artists() {
    const classes = useStyles();
    const [playlists, setPlaylists] = useState([]);
    const [modal, setModal] = useState(null);

    const [open, setOpen] = useState(false);

    const handleOpen = (playlist) => { 
        const body = (
            
                <ModalComponent video={0} playlistName={playlist.title} playlist={playlist.videos} />
          
        );
        setModal(body)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch("https://tizzy-visions-v2.herokuapp.com/api/playlists")
            .then(res => res.json())
            .then(ytPlaylists => {
                //console.log(ytPlaylists)
                let checkTitle = (list) => {
                    return list.title ? !list.title.includes("Film") && !list.title.includes("Vlog") && !list.title.includes("Music Videos") : null;
                }
                let musicVideos = ytPlaylists.filter(checkTitle)
                setPlaylists(musicVideos)
            })
            .catch(console.error());
    }, [])

    return (
        <>
        
            <GridList cellHeight="auto" spacing={8} className={classes.gridList}>
                {playlists.map((playlist, index) => (
                    <GridListTile key={index} cols={index === 0 || index === 3 || index === 6 ? 2 : 1} rows={index === 0 || index === 3 || index === 6 ? 2 : 1}>
                        <img onClick={() => handleOpen(playlist)} src={playlist.videos[0].poster} alt={playlist.title} />
                        <GridListTileBar
                            title={playlist.title}
                            titlePosition="bottom"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
            {open 
            ? <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modal}
            </Modal>
            : (<></>)}
            
        </>
    );
}
