import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Hls from "hls.js";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom: 24,
        marginLeft: 24,
        marginRight: 60
    },
    image: {
        marginLeft: 24,
        width: 200,
        height: 200
    },
    img: {
        display: "block",
        width: 200,
        height: 200,
        maxWidth: "100%",
        maxHeight: "100%"
    },
    detail: {
        marginLeft: 16
    },
    progress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HLS: null
        }
    }

    componentDidMount() {
        if (this.props.episode && this.player) {
            var hlsUrl = this.props.episode.assets.hls;
            var video = this.player;
            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // If HLS is natively supported, let the browser do the work!
                video.src = "hlsUrl";
                video.addEventListener("loadedmetadata", function () {
                    video.play();
                });
            } else if (Hls.isSupported()) {
                // If the browser supports MSE, use hls.js to play the video
                var hls = new Hls({
                    // This configuration is required to insure that only the
                    // viewer can access the content by sending a session cookie
                    // to api.video service
                    xhrSetup: function (xhr, url) {
                        // xhr.withCredentials = true;
                        // xhr.open('GET', url);
                        // xhr.setRequestHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
                        // xhr.setRequestHeader("Access-Control-Allow-Origin","*");
                        // xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
                        // xhr.withCredentials = false;
                    }
                });

                this.setState({HLS: hls})
                hls.loadSource(hlsUrl);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    video.play();
                });

            } else {
                alert("Please use a modern browser to play the video");
            }
        }
    }

    chargeQuality0 = () => this.setState(state => state.HLS.currentLevel=0)
    chargeQuality1 = () => this.setState(state => state.HLS.currentLevel=1)
    chargeQuality2 = () => this.setState(state => state.HLS.currentLevel=2)
    chargeQuality3 = () => this.setState(state => state.HLS.currentLevel=3)
    chargeQuality4 = () => this.setState(state => state.HLS.currentLevel=4)
    chargeQuality5 = () => this.setState(state => state.HLS.currentLevel=5)

    handleSerieClick = () => {
        this.props.history.push("/" + this.props.serie.apiName);
    };

    // _onTouchInsidePlayer() {
    //     if (this.player.paused) {
    //         this.player.play();
    //     } else {
    //         this.player.pause();
    //     }
    // }

    render() {
        const { classes, theme } = this.props;
        if (this.props.episode) {
            const { assets, title, description, videoId } = this.props.episode;
            return (
                <Grid className={classes.root} item xs={12}>
                    <video
                        controls
                        // onClick={this._onTouchInsidePlayer}
                        ref={player => (this.player = player)}
                        autoPlay={true}
                    />
                    <button onClick={this.chargeQuality0}>chargeQuality 0</button>
                    <button onClick={this.chargeQuality1}>chargeQuality 1</button>
                    <button onClick={this.chargeQuality2}>chargeQuality 2</button>
                    <button onClick={this.chargeQuality3}>chargeQuality 3</button>
                    <button onClick={this.chargeQuality4}>chargeQuality 4</button>
                    <button onClick={this.chargeQuality5}>chargeQuality 5</button>
                    <div id="timelineTab"></div>
                </Grid>
            );
        } else {
            return (
                <Grid className={classes.progress} item xs={12}>
                    <CircularProgress size={100}/>
                </Grid>
            );
        }
    }
}

export default withStyles(styles, { withTheme: true })(Video);