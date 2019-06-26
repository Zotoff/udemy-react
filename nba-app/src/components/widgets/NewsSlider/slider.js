import React, {Component} from 'react';
import SliderTemplate from './slider_templates';

import {firebase, firebaseArticles, firebaseLooper} from '../../../firebase';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount(){
        // Entering the request to Firebase
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{ 
            // Setting up the promise
            const news = firebaseLooper(snapshot);

            const asyncFunction = (item,i, cb) => {
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then( url => {
                    news[i].image = url;
                    cb();
                })
            }

            let requests = news.map((item, i) => {
                return new Promise((resolve) => {
                    asyncFunction(item,i, resolve)
                })
            })

            Promise.all(requests).then(()=>{
                this.setState({
                    news
                })
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