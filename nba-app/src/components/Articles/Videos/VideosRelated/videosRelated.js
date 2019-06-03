import React from 'react';
import styles from '../videos.css';

import VideosListTemplate from '../../../widgets/VideosList/videosListTemplate';

const videosRelated = (props) => {
    return (
        <div className={styles.relatedWrapper}>
            <VideosListTemplate 
                data={props.data}
                teams={props.teams}
            />
        </div>
    )
}

export default videosRelated