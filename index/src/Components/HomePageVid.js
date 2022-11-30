//importing required packages for site
import React from 'react';
import "../Styles/homePageVid.css";
import homepagevid from "./homepagevideo.mp4";
//import signup from "../Pages/Signup"

function HomePageVid() {
  return (
    <div className='vid-container'>
      {/* displaying my created video, looped and without sound */}
        <video src={homepagevid} autoPlay loop muted/>
        <div className='videotext'>
          {/* displaying homepage text */}
            <h1 className = "titlehomepage">MOVIE MAGIC</h1>
            <p  className = "homepagepara">Connect with friends and find your new favorite movie!</p>
            <p className = "homepagepara">Get started now!</p>
            </div>
    </div>
  )
}

// exporting component back to home page
export default HomePageVid;
