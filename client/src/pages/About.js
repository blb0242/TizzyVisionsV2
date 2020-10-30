import React from 'react';
import $ from 'jquery';
import Grid from "@material-ui/core/Grid";

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
                    <img alt="Chayce Tisdale" src="/images/tizzynewlogostanding.jpg" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="body">
                        <p>
                            Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
                        </p>
                        <p>
                            Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
                        </p>
                        
                    </div>
                </Grid>
            </Grid>
            
           
        </div>
    )
}
