import React, { useState } from "react";
// import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from "@material-ui/core/styles";
// import json2mq from "json2mq";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import { NavLink } from "react-router-dom";
import { Instagram as IGIcon, Facebook as FBIcon, Twitter as TwitterIcon, YouTube as YTIcon, Menu as MenuIcon  } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    nested2: {
        paddingLeft: theme.spacing(8),
    },
    sideNav: {
        width: "12.5%",
        position: "fixed",
        zIndex: "1",
        top: "2%",
        left: "1%"
    },
    menu:{
        marginLeft: "auto"
    },
    logo: {
        paddingTop: "20%",
        paddingBottom: "80%",
        maxWidth: "100%"
    },
    tabletNav: {
        display: "flex",
        paddingBottom: "20%",
        position: "sticky",
        top: "1%"
    },
    tabletMenu: {
        marginLeft: "auto"
    },
    tabletLogo: {
        width: "25%"
    },
    mobileNav: {
        display: "flex",
        paddingBottom: "10%",
        position: "sticky",
        top: "1%"
    },
    mobileMenu: {
        marginLeft: "auto"
    },
    mobileLogo: {
        width: "15%"
    }
}));

export default function SideNav(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClick2 = (list) => {
        list === "film" ? setOpen(!open) : setOpen2(!open2);
    };


    return (
        <div className="">
            <div className="">
                <img
                    src='/images/bigTVlogo.png'
                    alt='Tizzy Visions Logo'
                />
            </div>
            <Hidden smUp>
                <Button
                    className=""
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                >
                    <MenuIcon />
                </Button>
                <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >   
                    
                    <NavLink to="/music-videos">
                        <MenuItem onClick={handleClose}>Music Videos</MenuItem>
                    </NavLink>
                    <NavLink to="/weddings">
                        <MenuItem onClick={handleClose}>Weddings</MenuItem>
                    </NavLink>
                    <NavLink to="/vlogs">
                        <MenuItem onClick={handleClose}>Vlogs</MenuItem>
                    </NavLink>
                    <NavLink to="/about">
                        <MenuItem onClick={handleClose}>About</MenuItem>
                    </NavLink>
                </Menu>
            </Hidden>
            
            <Hidden xsDown>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                
                className={classes.root}
                >
                <NavLink to="/">
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>
                <ListItem button onClick={() => handleClick2("film")}>
                    <ListItemText primary="Film" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => handleClick2("musicVideos")}>
                        <ListItemText primary="Music Videos" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink to="/artists">
                                <ListItem button className={classes.nested2}>
                                    <ListItemText primary="Artists" />
                                </ListItem>
                            </NavLink>
                            <NavLink to="/music-videos">
                                <ListItem button className={classes.nested2}>
                                    <ListItemText primary="Music Videos" />
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                        <NavLink to="/vlogs">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary="Vlogs" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/weddings">
                            <ListItem button className={classes.nested}>
                                <ListItemText primary="Weddings" />
                            </ListItem>
                        </NavLink>
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemText primary="Photography" />
                </ListItem>
                <Link target="_blank" href="https://www.depop.com/tizzyv/">
                    <ListItem button>
                        <ListItemText primary="Shop" />
                    </ListItem>
                </Link>
                
                <NavLink to="/about">
                    <ListItem button>
                        <ListItemText primary="About" />
                    </ListItem>
                </NavLink>
                
                
                
                
            </List>
                
                <br />
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/tizzy_visions/">
                    <IGIcon fontSize="large" style={{ color: "#e95950" }} />
                </a>
                
                <a target="_blank" rel="noopener noreferrer" href="https://m.facebook.com/tizzyvisions/">
                    <FBIcon fontSize="large" style={{ color: "#3b5998" }} />
                </a>
                
                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/tizzy_visions">
                    <TwitterIcon fontSize="large" style={{ color: "#55acee" }} />
                </a>
                
                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/CKTIZZY/">
                    <YTIcon fontSize="large" style={{ color: "#ff0000" }} />
                </a> 
                
            </Hidden>
            
        </div>
    );
};




