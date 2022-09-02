import React from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import './navBar.css';
import {FaBars, FaTimes} from "react-icons/fa";
/* eslint-disable */


function Navbar() {
const navRef = useRef();

const displayNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
}

  return (

    <header>
        <img src={require('./movieMagicIcon.png')} />
        <nav ref = {navRef}>
            <a href= './homePage'>Home</a>
            <a href= './aboutPage'>About</a>
            <a href= './contactPage'>Contact</a>
            {/* wondering if i should add this in, not sure if i want it to be here or a link underneath the text boxes */}
            <button className= "logInButton">Log In</button>
            <button className = "navclicks closeNav" onClick={displayNavbar}><FaTimes/></button>
        </nav>
        <button className = "navclicks" onClick={displayNavbar}><FaBars/></button>
    </header>
  )
}

export default Navbar;

/* <div>
<nav className = "Navbar">
    <div className = "logo">
        <img src ='../visuals/placeholder.jpg'></img>
        <h1>Name of Site here</h1>
    </div>

    <div className = "links">
        <Link to = "/homePage">Home Page</Link>
        <Link to = "/aboutPage">About Page</Link>
        <Link to = "/contactPage">Contact Page</Link>
        {/* <input type = "button">Sign up</input> }*/
        
//     </div>
// </nav>
// </div> */}