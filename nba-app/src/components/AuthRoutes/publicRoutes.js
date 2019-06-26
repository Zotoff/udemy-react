import React from 'react'
import {Route, Redirect} from 'react-router-dom';

const PublicRoutes = ({
    // Making a reference to authorized user and component we want to render
    user,
    component: Comp,
    // Storing all the props inside rest
    ...rest
}) => {
   return <Route {...rest} component={(props) => (
       rest.restricted ? 
       (
        // Checking if the user is logged in 
        user ? 
         <Redirect to="/dashboard" />
        :
        <Comp {...props} user={user} />
        ) 
       : <Comp {...props} user={user} />
   )}/>
}

export default PublicRoutes;
