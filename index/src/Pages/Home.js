import '../Styles/Home.css';
import React from 'react';
import HomePageVid from '../Components/HomePageVid';
// import {useLocation, useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';




function Home (){

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function (event) {
      window.history.go(1);
  }


    return(
      <HomePageVid />
    );

}





export default Home;


