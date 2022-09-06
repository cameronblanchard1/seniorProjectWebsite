import React from 'react';
import "../Styles/homePageVid.css";

function HomePageVid() {
  return (
    <div className='vid-container'>
        <video src='./PrincessandFrog.mp4' autoPlay loop muted/>
        <h1>MOVIE MAGIC</h1>
        <p>Connect with friends and find your new favorite movie</p>
    </div>
  )
}

export default HomePageVid;
