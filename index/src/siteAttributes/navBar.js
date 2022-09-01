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
        <h3>Logo here</h3>
        <nav ref = {navRef}>
            <a href= '/#'>Home Page</a>
            <a href= '/#'>About Page</a>
            <a href= '/#'>Contact Page</a>
            <button onClick={displayNavbar}><FaTimes/></button>
        </nav>
        <button onClick={displayNavbar}><FaTimes/></button>
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