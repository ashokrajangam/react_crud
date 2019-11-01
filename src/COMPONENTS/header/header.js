import React from 'react';
import {NavLink} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <ul id="mainMenu">
                <li><NavLink to="/" exact>SignUp</NavLink></li>
                <li><NavLink to={{
                    pathname:'/signIn',
                    hash: '#',
                    search:'?submit=true'                
            }} exact >SignIn</NavLink></li>
            </ul>
        </div>
    )
}

export default Header;