import React, {Component} from 'react';
import SliderTemplate from './slider_templates';

import {firebaseArticles, firebaseLooper} from '../../../firebase';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount(){
        // Entering the request to Firebase
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{ // Setting up the promise
            const news = firebaseLooper(snapshot);
            // Setting up the state
            this.setState({
                news
            })
        })
    }

    render() {
        return (
            <div>
                <SliderTemplate data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            </div>
        )
    }
}

export default NewsSlider;