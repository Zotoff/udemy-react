import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom';

// Components
import Home from './components/home';
import Profile from './components/profile';
import Posts from './components/posts';
import PostItem from './components/post_item';
import ErrorPage from './components/404';


const App = () => {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <NavLink to="/">Home</NavLink><br/>
                    <NavLink to="/posts">Posts</NavLink><br/>
                    <NavLink to={{
                        pathname: '/profile',
                        hash: '#francis',
                        search: '?profile=true'
                        
                    }} activeStyle={{color: 'red'}}>Profile</NavLink><br/>
                    <hr/>
                </header>
                <Switch>
                    <Route path="/posts/:id" component={PostItem}/>
                    <Route path="/posts" component={Posts}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/" component={Home}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)

export default App;