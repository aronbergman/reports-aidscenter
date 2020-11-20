import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const WelcomeCard = props => {
    const classes = useStyles();
    return (
        <Link to={`/video/${props.video.folder}`}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://localhost:5001/public/videos/${props.video.folder}/preview.jpg`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.video.title} – {props.video.id}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
