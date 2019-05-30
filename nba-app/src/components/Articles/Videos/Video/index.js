import React, {Component} from 'react';
import axios from 'axios';
import {URL} from '../../../../config';


import Header from './header';
import styles from '../../articles.css';

class VideoArticle extends Component {

    state = {
        article: [],
        team: []
    }

    componentWillMount(){
        axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        .then(
            response => {
                let video = response.data[0];
                axios.get(`${URL}/teams?id=${video.team}`)
                .then(response => {
                    this.setState({video, team: response.data})
                })
            }
        )
    }


    render(){
        const article = this.state.article;
        const team = this.state.team;
        return (
            <div>
                <Header teamData={team[0]} />
            </div>
        )
    }
}

export default VideoArticle;