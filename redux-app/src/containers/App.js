import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moviesList} from '../Actions';
import {bindActionCreators} from 'redux';
import MoviesList from '../components/moviesList';


class App extends Component {

    componentWillMount(){
        // Runs and passes the payload to the reducer, while we passing actions to connect function
        this.props.moviesList();
    }


    render(){
        return(
            <div>
               <MoviesList {...this.props}/>
            </div>
        )
    }
}

// Listening, when the action runs, and passing the new state into the movies. After that injects the state.
const mapStateToProps = (state) => {
    return {
        data: state.movies
    }
}

// // Dispatching the current action from actions.js

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getMovies: () => {
//             dispatch(moviesList())
//         }
//     }
// }

// Working with bindActionCreators
const mapDispatchToProps = (dispatch) => {
    // First Parameter - object with list of actions
    return bindActionCreators(
        {moviesList
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);