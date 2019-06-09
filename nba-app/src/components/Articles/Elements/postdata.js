import React from 'react';
import styles from '../../Articles/articles.css';
import moment from 'moment';


const formatDate = (date) => {
    return moment(date).format(' MM-DD-YYYY')
}

const PostData = (props) => {
    return (
        <div className={styles.articlePostData}>
            <div>
                Date: 
                <span>{formatDate(props.data.date)}</span>
            </div>
            <div>
                Author:
                <span>{props.data.author}</span>
            </div>
        </div>
    )
}

export default PostData;