import React from "react";
import "../Styles/Movies.css";
import {useLocation} from 'react-router-dom';

const IMG_API="https://image.tmdb.org/t/p/w500/";
const location = useLocation();

const Movie =({title, backdrop_path, vote_average, overview})=>
(
    
    <div className = "movieimages">
        <img src={IMG_API+backdrop_path} alt={title}/>
        <h2>{title}</h2>
        <button className="button" onClick={event => likemovie(event, {title})}>Liked</button>
        <button className = "button">Disliked</button>
    </div>
);


const likemovie = (event, title) =>{
  
   console.log(title)
   console.log(location.state.name)
}

export default Movie;