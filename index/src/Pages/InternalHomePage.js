import {useEffect, useState} from 'react';
import '../Styles/Contact.css';
import Movie from './Script';
import {useLocation} from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";


const API ="https://api.themoviedb.org/3/trending/movie/week?api_key=5ad343d5a012d9491667c2c470dc0273";
const SEARCH_API="https://api.themoviedb.org/3/search/movie?api_key=89eef3426d167c3c8145a257ebe68357&query=";
const TOP_RATED_API="https://api.themoviedb.org/3/trending/movie/week?api_key=5ad343d5a012d9491667c2c470dc0273"


function InternalHomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.name;

  const routeChange = (event) =>{ 
    event.preventDefault();
    navigate("/PersonalProfile", {state: {name: location.state.name}})
  }

  useEffect(()=>{
    fetch(TOP_RATED_API)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results);
      });
    },[]);


  
  return <div>
    <h2 className = "usernameinfo">Welcome, {location.state.name}!</h2>
    <h3 className= "moviespre">Trending Movies for this week: </h3>
    <button className='likedbutton'  onClick={routeChange}>Your Rated Movies</button>
    {movies?.length > 0 && movies.map((movie)=>
    <Movie key={movie.id} {...movie}/> 
  
  )}
  </div>

  



}

export default InternalHomePage;