import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './hoc/home/home';
import Layout from './hoc/layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/NewsMain/newsMain';
import VideosMain from './components/Articles/Videos/VideosMain/videosMain';
import Signin from './components/Signin/signin';

const Routes = (props) => {
        return (
            // Passing the props to layout component
            <Layout user={props.user}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain} />
                    <Route path="/articles/:id" exact component={NewsArticle} />
                    <Route path="/videos/:id" exact component={VideoArticle}/>
                    <Route path="/videos" exact component={VideosMain} />
                    <Route path="/sign-in" exact component={Signin} />
                </Switch>
            </Layout>
        )
}

export default Routes;