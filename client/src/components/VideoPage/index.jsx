import React, { useEffect } from 'react';
import VideoPlayer from "../VideoPlayer";

const VideoPage = props => {
console.log(props.match.params.id)
    return (
        <div>
            VideoPage
            <VideoPlayer video={props.match.params.id}/>
        </div>
    );
};

export default VideoPage;
