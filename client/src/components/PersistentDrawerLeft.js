import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Collapse, Grid } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Instagram as IGIcon, Facebook as FBIcon, Twitter as TwitterIcon, YouTube as YTIcon } from '@material-ui/icons';
import { Icon, InlineIcon } from '@iconify/react';
import vimeoIcon from '@iconify-icons/mdi/vimeo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: {
    background: 'black'
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  
  const [open2, setOpen2] = useState(false);

  const handleClick2 = (list) => {
      list === "film" ? setOpen(!open) : setOpen2(!open2);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, openDrawer && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          
            <Grid item xs={2} sm={6} >
              <img
                  src='/images/bigTVlogo.png'
                  alt='Tizzy Visions Logo'
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          Tizzy Visions
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List >
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
        <Grid 
            container
            direction="row"
            alignItems="center"
            justify="space-evenly"
        >
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
            <a target="_blank" rel="noopener norederrer" href="https://vimeo.com/tizzyvisions">
                <Icon icon={vimeoIcon} width="2em"/>
            </a>
        </Grid>
      </Drawer>
      {/* <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        
      </main> */}
    </div>
  );
}
