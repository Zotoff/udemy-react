import React from 'react';
import {NavLink} from 'react-router-dom';

const ErrorPage = (props) => {
    return (
        <div>
            <h3>Oops, 404 page</h3>
            <hr/>
            <NavLink to="/">Go to the main page</NavLink>            
        </div>
    )
}


export default ErrorPage;