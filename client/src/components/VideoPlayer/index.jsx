import React, { Component } from "react";

import Hls from "hls.js";

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HLS: null
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.video && this.player) {
            var hlsUrl = `http://localhost:5001/public/videos/${this.props.video}/master.m3u8`;
            var video = this.player;
            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // If HLS is natively supported, let the browser do the work!
                video.src = "hlsUrl";
                video.addEventListener("loadedmetadata", function () {
                    video.play();
                });
            } else if (Hls.isSupported()) {
                // If the browser supports MSE, use hls.js to play the video
                var hls = new Hls();
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

    // _onTouchInsidePlayer() {
    //     if (this.player.paused) {
    //         this.player.play();
    //     } else {
    //         this.player.pause();
    //     }
    // }

    render() {
        if (this.props.video) {
            return (
                <>
                    <video
                        controls
                        // onClick={this._onTouchInsidePlayer}
                        ref={player => (this.player = player)}
                        autoPlay={true}
                    />
                    <br/>
                    <button onClick={this.chargeQuality0}>240p</button>
                    <button onClick={this.chargeQuality1}>360p</button>
                    <button onClick={this.chargeQuality2}>480p</button>
                    <button onClick={this.chargeQuality3}>720p</button>
                    <button onClick={this.chargeQuality4}>1080p</button>
                </>
            );
        } else {
            return (
                <p>Загрузка</p>
            );
        }
    }
}

export default Video;