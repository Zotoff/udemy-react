import React from 'react'
import {Route, Redirect} from 'react-router-dom';

const PrivateRoutes = ({
    // Making a reference to authorized user and component we want to render
    user,
    component: Comp,
    // Storing all the props inside rest
    ...rest
}) => {
    return <Route {...rest} component={(props)=>(
        user ? 
            <Comp {...props} user={user} />
        :
        <Redirect to="/sign-in"/>
    )}/>
}

export default PrivateRoutes;
