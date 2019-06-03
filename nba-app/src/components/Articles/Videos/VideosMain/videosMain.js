import React from 'react';
import VideosList from '../../../widgets/VideosList/videoslist';

const VideosMain = () => {
    return (
        <div>
            <VideosList 
                type='card'
                title={false}
                loadMore={true}
                start={0}
                amount={8}
            />
        </div>
    )
}


export default VideosMain;