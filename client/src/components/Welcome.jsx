import React, { Component } from "react";

import VideoService from "../services/video.service";

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: ""
        };
    }

    componentDidMount() {
        VideoService.getFirstListVideos()
            .then(data => this.setState({
                videos: data.data.videos
            }))
    }

    render() {
        return (
            this.state.videos && this.state.videos.map(video => <div data-href={video.folder}>{video.title}</div>)
        );
    };
}
