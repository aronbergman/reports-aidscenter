import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { WelcomeCard } from "./WelcomeCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export const WelcomeGrid = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {props.videos.map((video, index) => <Grid key={video.folder + index} item xs={6} sm={3}>
                    <WelcomeCard video={video}/>
                </Grid>)}
            </Grid>
        </div>
    );
}
