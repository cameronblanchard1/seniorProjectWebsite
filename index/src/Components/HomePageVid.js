import React from 'react';
import "../Styles/homePageVid.css";
import homepagevid from "./homepagevideo.mp4";
import signup from "../Pages/Signup"

function HomePageVid() {
  return (
    <div className='vid-container'>
        <video src={homepagevid} autoPlay loop muted/>
        <div className='videotext'>
            <h1>MOVIE MAGIC</h1>
            <p>Connect with friends and find your new favorite movie!</p>
            <p>Get started now!</p>
            </div>
    </div>
  )
}

export default HomePageVid;
