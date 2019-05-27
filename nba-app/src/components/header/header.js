import React from 'react';
import style from './header.css';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import SideNavigation from './SideNav/sidenav';

const Header = (props) => {

    const logo = () => {
        return(
            <Link to="/" className={style.logo}>
                <img src="/images/nba_logo.png" alt="logo"/>
            </Link>
        )
    }

    const navBars = () => {
        return(
            <div className={style.bars}>
                <FontAwesome name="bars" onClick={props.onOpenNav} style={{
                    color: '#fdfdfd',
                    padding: '10px',
                    cursor: 'pointer'
                }}/>
            </div>   
        )
    }

    return (
        <header className={style.header}>
            <SideNavigation {...props} />


            <div className={style.headerOpt}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}

export default Header;