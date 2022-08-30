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
            </div>
            



            <div className = "links">
                <Link to = "/">Home Page</Link>
                <Link to = "/aboutPage">About Page</Link>
                <Link to = "/contactPage">Contact Page</Link>
                
            </div>
        </nav>
    </div>
  )
}

export default Navbar;