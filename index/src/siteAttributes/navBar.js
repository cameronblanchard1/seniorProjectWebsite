import React from 'react';
import { Link } from "react-router-dom";
import './navBar.css';
/* eslint-disable */


function Navbar() {
  return (
    <div>
        <nav className = "Navbar">
            <div className = "logo">
                <img src ='../visuals/placeholder.jpg'></img>
                <h1>Name of Site here</h1>
            </div>

            <div className = "links">
                <Link to = "/homePage">Home Page</Link>
                <Link to = "/aboutPage">About Page</Link>
                <Link to = "/contactPage">Contact Page</Link>
                {/* <input type = "button">Sign up</input> */}
                
            </div>
        </nav>
    </div>
  )
}

export default Navbar;