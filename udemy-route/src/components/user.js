import React from 'react';
import userHOC from '../hoc/userHOC';

const User = (props) => {
    return (
        <div>
            <h3>User 1</h3>
        </div>
    )
}

export default userHOC(User, 'Hello');
