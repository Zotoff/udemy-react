import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import styles from './videoslist.css';
import Button from '../Buttons/buttons';
import CardInfo from '../CardInfo/cardinfo';

import VideosTemplate from './videosListTemplate';

import {firebaseTeams, firebaseVideos, firebaseLooper} from '../../../firebase';

class VideosList extends Component {
    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount(){
        this.request(this.state.start, this.state.end);  
    }

    request = (start, end) => {

        if(this.state.teams.length < 1) {
            firebaseTeams.once('value')
            .then((snapshot)=>{
                const teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })
            })
            // axios.get(`${URL}/teams`)
            // .then(response => {
            //     this.setState({
            //         teams: response.data
            //     })
            // })
        }
        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const videos = firebaseLooper(snapshot);
            this.setState({
                videos: [...this.state.videos,...videos],
                start,
                end
            })
        })
        .catch(e=>{
            console.log(e);
        })


        // axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        // .then(response => {
        //     this.setState({
        //         videos: [...this.state.videos,...response.data],
        //         start,
        //         end
        //     })
        // })
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }

    renderTitle = (title) => {
        return title ? <h3><strong>NBA</strong> Videos</h3> : null
    }

    renderButton = () => {
        return this.props.loadmore ? 
        <Button 
                    type="loadmore"
                    loadMore={()=>this.loadMore()}
                    linkTo="/videos"
                    cta="Load More Videos"                  
                /> 
        :
        <Button 
                    type="linkTo"
                    linkTo="/videos"
                    cta="More Videos"                  
                /> 

    }

    renderVideos = (type) => {
        let template = null;

        switch(type) {
            case('card'):
                template=<VideosTemplate data={this.state.videos} teams={this.state.teams}/>
                break;
            default:
                template=null;
        }
        return template;
    }

    render() {
        return(
            <div className={styles.videoList_wrapper}>
                {this.renderTitle(this.props.title)}
                <TransitionGroup
                    component="div"
                    className="list"
                >
                {this.renderVideos(this.props.type)}
                </TransitionGroup>
                {this.renderButton()}
            </div>
        )
    }
}

export default VideosList;