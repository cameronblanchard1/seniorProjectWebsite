import '../Styles/Home.css';
import React from 'react';
import HomePageVid from '../Components/HomePageVid';
// import {useLocation, useHistory} from 'react-router-dom';
//import {useEffect, useState} from 'react';

import {useLocation} from 'react-router-dom';



function Home (param){

    //preventing returns after logout 
    const location = useLocation();
    console.log("here 1")
    console.log(param)

console.log(location.state)

if (location.state != null){
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
        window.location.reload(false)

    }
}

//displaying homepage video
    return(
      <HomePageVid />
    );

}





export default Home;


