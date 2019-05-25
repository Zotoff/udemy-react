import React from 'react';

const userHOC = (wrapperComponent, arg1) => {
    return (props) => (
        <div>
            {arg1}
            <wrapperComponent {...props}/>
        </div>
    )
}
export default userHOC;