import React from "react";
import "../Styles/Movies.css";
import {Route, useNavigate, useLocation, Link} from 'react-router-dom';
import InternalHomePage from "./InternalHomePage";
import Axios from "axios";

const IMG_API="https://image.tmdb.org/t/p/w500/";
const data = "Hello Everyone";


const Movie =({title, backdrop_path, vote_average, overview})=>
(
    
    <div className = "movieimages">
        <img src={IMG_API+backdrop_path} alt={title}/>
        <h2>{title}</h2>
        <button className="button" onClick={event => Likemovie(event, {title})}>Liked</button>
        <button className="button" onClick={event => Dislikemovie(event, {title})}>Disliked</button>
    </div>
);



// const Likemovie = (event, {title}) => {  
//     console.log({title})
//     event.preventDefault();
//     Axios.post('http://localhost:3001/likes', {
//       movietitle: {title}
//     }).then();



// }



function Likemovie (event, {title}){

    console.log(title)
    event.preventDefault();
    Axios.post('http://localhost:3001/likes', {
      movietitle: title,
      username: "cameron"
    }).then();
}

function Dislikemovie (event, {title}){

    console.log(title)
    event.preventDefault();
    Axios.post('http://localhost:3001/dislikes', {
      movietitle: title,
      username: "cameron"
    }).then();
}


export default Movie;