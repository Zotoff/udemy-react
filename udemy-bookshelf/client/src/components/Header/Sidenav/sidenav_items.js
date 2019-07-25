import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


const SideNavItems = () => {

    // Creating the navigation items at the sidebar
    const items  = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false // For premium users
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My profile',
            link: '/user',
            restricted: false // For premium users
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: false // For premium users
        },
        {
            type: 'navItem',
            icon: 'fa-sign-in',
            text: 'Login',
            link: '/login',
            restricted: false // For premium users
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Reviews',
            link: '/user/reviews',
            restricted: false // For premium users
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Reviews',
            link: '/user/add',
            restricted: false // For premium users
        },
        {
            type: 'navItem',
            icon: 'fa-sign-out',
            text: 'Logout',
            link: '/user/logout',
            restricted: false // For premium users
        }
    ]

    const element = (item, i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        items.map((item, i)=>{
            return element(item, i)
        })
    )

    return (
        <div>
            {showItems()}
        </div>
    )
}

export default SideNavItems;