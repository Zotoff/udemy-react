import React from 'react';
import SideNav from 'react-simple-sidenav';

const SideNavigation = (props) => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                style={{
                    color: '#dfdfdf',
                    color: '#ffffff',
                    maxWidth: '220px'
                }}
            >
                OPTIONS
            </SideNav>
        </div>
    )
}

export default SideNavigation;