import React from 'react';
import $ from 'jquery';
import Grid from "@material-ui/core/Grid";
import { GridList, GridListTile } from '@material-ui/core';

const tileData = [
    {
        img: "/images/tizzy_face_down.JPG",
        title: 'Image',
        author: 'author',
        cols: 2,
    },
    {
        img: "/images/tizzy_stance.JPG",
        title: 'Image',
        author: 'author',
        cols: 1,
    },
    {
        img: "/images/tizzy_back.JPG",
        title: 'Image',
        author: 'author',
        cols: 1,
    }
   

]

export default function About() {
    // let w = $("section")
    $(window).scroll(() => {
        let value = window.scrollY + "px";
        $("section").css({"clipPath" : "circle("+value+" at center)"})
    })
    return (
        <div className="about">
            <h1>About Tizzy</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                        {/* <img alt="Chayce Tisdale" src="/images/tizzynewlogostanding.jpg" /> */}
                        <GridList cellHeight={400} cols={2}>
                            {tileData.map((tile) => (
                                <GridListTile key={tile.img} cols={tile.cols || 1} style={{ height: 'auto' }}>
                                <img src={tile.img} alt={tile.title} />
                                </GridListTile>
                            ))}
                        </GridList>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <div className="body">
                        {/* <p>
                            Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
                        </p>
                        <p>
                            Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
                        </p> */}
                        
                    </div>
                </Grid>
            </Grid>
            
           
        </div>
    )
}
