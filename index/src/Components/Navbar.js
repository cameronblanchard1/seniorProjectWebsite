//importing necessary packages
import React from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import './navBar.css';
import {FaBars, FaTimes} from "react-icons/fa";

function Navbar() {

//using use ref so the nav bar doesnt have to rerender on every redirect
const navRef = useRef();

//displays responsive nav when screens at certain size
const displayNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
}

  return (

    <header>
        {/* using icon */}
        <img src={require('./movieMagicIcon.png')} />
        <nav ref = {navRef}>

            {/* creating links */}
            <Link to = "/">Home</Link>
            <Link to = "/Contact">Contact</Link>
            <Link to="/Signup"> <button className= "signUpButton">Sign up</button></Link>
            <Link to="/Login"> <button className= "logInButton">Log In</button></Link>

            {/* attempting responsive nav bar and to display the icons to allow drop down */}
            <button className = "navclicks closeNav" onClick={displayNavbar}><FaTimes/></button>
        </nav>
        <button className = "navclicks" onClick={displayNavbar}><FaBars/></button>
    </header>
  )
}

export default Navbar;

