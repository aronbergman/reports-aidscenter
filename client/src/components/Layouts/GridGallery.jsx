import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Video from "../VideoPlayer";

export default function GridGallery() {
    const episode = {
        assets: {
            hls: 'http://localhost:5001/public/videos/1605712725778/master.m3u8'
        }
    }

    return (
        <div className="container">
            <Grid container item xs={12}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper>item</Paper>
                    </Grid>)}
            </Grid>

            <div style={{
                width: 400,
                height: 400,
                backgroundImage: 'url("http://localhost:5001/public/images/1604165286337-2A4D62AD-F500-49C3-9DE7-2D1F73165F4E.jpeg")'
            }} alt=""/>

hello
            <Video episode={episode}/>
        </div>
    );
}