import React from "react";
import "../Styles/Movies.css";

const IMG_API="https://image.tmdb.org/t/p/w500/";


const Movie =({title, backdrop_path, vote_average, overview})=>
(
    <div className = "movieimages">
        <img src={IMG_API+backdrop_path} alt={title}/>
        <h2>{title}</h2>
        {/* <h3 className="words">{overview}</h3> */}
    </div>
);


export default Movie;