import React from "react";
import SideNav from "./components/SideNav";
import Home from "./pages/Home.js";
import './App.css';
// import Container from '@material-ui/core/Container';
// import json2mq from "json2mq";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import { Weddings } from "./pages/Weddings";
import { Vlogs } from "./pages/Vlogs";
// import MediaCard from "./MediaCard";
import MusicVideos from "./pages/MusicVideos";
import Artists from "./pages/Artists"
import { Grid } from "@material-ui/core";

  

export default function App() {


  return (
    <Grid 
    container
    spacing={4}
    direction="row"
    >
      <Router>
        <Grid item xs={12} sm={4} md={2}>
          <SideNav />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/music-videos">
              <MusicVideos />
              {/* <Artists /> */}
            </Route>
            <Route path="/artists">
              <Artists />
            </Route>
            <Route path="/about">
              <About />
              {/* <MediaCard /> */}
            </Route>
            <Route path="/weddings">
              <Weddings />
            </Route>
            <Route path="/vlogs">
              <Vlogs />
            </Route>
          </Switch>
        </Grid>
      </Router>
      {/* <Cursor /> */}
    </Grid>
  );
}
