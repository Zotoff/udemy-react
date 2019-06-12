import React, {Component} from 'react';
import './layout.css';

import Header from '../../components/header/header';
import Footer from '../../components/Footer/footer';


class Layout extends Component {
    state = {
        showNav: false
    }

    toggleSidenav = (action) => {
        this.setState({
            showNav: action
        })
    }

    render(){
        return (
            <div>
                <Header
                    user = {this.props.user} // Passing the user into the header 
                    showNav={this.state.showNav}
                    onHideNav={()=>this.toggleSidenav(false)}
                    onOpenNav={()=>this.toggleSidenav(true)}                    
                />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default Layout;