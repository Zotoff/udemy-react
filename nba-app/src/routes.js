import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './hoc/home/home';
import Layout from './hoc/layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/NewsMain/newsMain';
import VideosMain from './components/Articles/Videos/VideosMain/videosMain';
import Signin from './components/Signin/signin';
import Dashboard from './components/Dashboard/dashboard';
import PrivateRoutes from './components/AuthRoutes/privateRoutes';
import PublicRoutes from './components/AuthRoutes/publicRoutes';

const Routes = (props) => {
        return (
            // Passing the props to layout component
            <Layout user={props.user}>
                <Switch>
                    <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
                    <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain} />
                    <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticle} />
                    <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticle}/>
                    <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain} />
                    <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={Signin} />
                    <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
                </Switch>
            </Layout>
        )
}

export default Routes;