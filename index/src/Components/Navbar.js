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
            <Link to = "/">Home</Link>
            <Link to = "/About">About</Link>
            <Link to = "/Contact">Contact</Link>
            <Link to="/Login"> <button className= "logInButton">Log In</button></Link>

            
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