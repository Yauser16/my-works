
import React from 'react';
import { Nav, NavLink, NavMenu, NavText } from './NavbarElements';
import logo from '../images/Logo.svg';

const Navbar = () => {
    return (
    <Nav>
         <NavMenu className="navigate">
            <NavLink className="menu" to="/" activestyle="true">
                <img src={logo} alt="logotip"/></NavLink> 
            <NavLink className="menu" to="/goods" activestyle="true">
                <NavText>Our coffee</NavText></NavLink>
            <NavLink className="menu" to="/coffee" activestyle="true">
                <NavText>For your pleasure</NavText></NavLink>                 
        </NavMenu>       
    </Nav>
    );
 }
export default Navbar;