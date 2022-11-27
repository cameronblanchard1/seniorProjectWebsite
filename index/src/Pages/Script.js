import React from "react";
import "../Styles/Movies.css";
import {Route, useNavigate, useLocation, Link} from 'react-router-dom';
import InternalHomePage from "./InternalHomePage";
import Axios from "axios";

const IMG_API="https://image.tmdb.org/t/p/w500/";
const data = "Hello";

function Movie ({title, backdrop_path, vote_average, overview}){
console.log(title)

    const location = useLocation()
    console.log(location.state.name)
//   }

function Likemovie (event, {title}){
    console.log(title)
    event.preventDefault();
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/likes', {
      movietitle: title,
      username: location.state.name
    }).then(
        console.log("Movie added once")
    );
}

function Dislikemovie (event, {title}){
    console.log(title)
    event.preventDefault();
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/dislikes', {
      movietitle: title,
      username: location.state.name
    }).then();
}


return(
    <div className = "movieimages">
        <img src={IMG_API+backdrop_path} alt={title}/>
        <h2>{title}</h2>
 
        <button className="button" onClick={event => Likemovie(event, {title})}>Liked</button>
        <button className="button" onClick={event => Dislikemovie(event, {title})}>Disliked</button>
    </div>
)

}

export default Movie;