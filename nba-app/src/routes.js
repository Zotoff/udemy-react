import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './hoc/home/home';
import Layout from './hoc/layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/NewsMain/newsMain';

class Routes extends Component {
    render(){

        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain} />
                    <Route path="/articles/:id" exact component={NewsArticle} />
                    <Route path="/videos/:id" exact component={VideoArticle}/>
                </Switch>
            </Layout>
        )
    }
}

export default Routes;