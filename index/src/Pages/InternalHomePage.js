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
  const [frienduser, setFrienduser] = useState('');
  const [sents, setSent] = useState([]);
  const [pendings, setPending] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.name;

  const routeChange = (event) =>{ 
    event.preventDefault();
    navigate("/PersonalProfile", {state: {name: location.state.name}})
  }

  const routeChange2 = (event) =>{ 
    event.preventDefault();
    navigate("/FriendsPage", {state: {name: location.state.name}})
  }

  useEffect(()=>{
    fetch(TOP_RATED_API)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results);
      });
    },[]);


    const submitInformation = (event) =>{
      console.log(frienduser)
      if (frienduser != ""){
      event.preventDefault();
      Axios.post('http://localhost:3001/pending', {
        username: user, 
        pendingfriend: frienduser
      }).then(
        alert("Request Sent!"), 
        navigate("/InternalHomePage", {state: {name: location.state.name}})
       )
    } else{
      alert("Must enter username")
    }
  }


  useEffect(() => {
    Axios.post('https://git.heroku.com/lets-make-movie-magic.gityoursentrequests', {
      username: user
    }).then(res => {
        // console.log(res.data)
        console.log(res.data.length)
        //try a for loop with size less than res.data
        // for (let i = 0; i < 1; i++) {
        //     setRatings(res.data);
        //     return;
        // } 
        console.log(res.data)
        setSent(res.data);
        // });
    })
    },[]);


    useEffect(() => {
      Axios.post('https://git.heroku.com/lets-make-movie-magic.git/yourpendingrequests', {
        username: user
      }).then(res => {
          // console.log(res.data)
          console.log(res.data.length)
          //try a for loop with size less than res.data
          // for (let i = 0; i < 1; i++) {
          //     setRatings(res.data);
          //     return;
          // } 
          console.log(res.data)
          setPending(res.data);
          // });
      })
      },[]);


      const AcceptFriend = (event, {key}) =>{ 
        event.preventDefault();
        // alert(JSON.stringify(pendings[key]));
        console.log(pendings[key].senderusername)
        console.log(pendings[key].pendingfriend)


        Axios.post('https://git.heroku.com/lets-make-movie-magic.git/addfriends', {
          friend1: pendings[key].senderusername, 
          friend2: pendings[key].pendingfriend
        }).then(
          alert("Friend Added!"),
          navigate("/InternalHomePage", {state: {name: location.state.name}})
         )
        } 


      const DeclineFriend = (event, {key}) =>{ 
        event.preventDefault();

        Axios.post('https://git.heroku.com/lets-make-movie-magic.git/rejectrequest', {
          friend1: pendings[key].senderusername, 
          friend2: pendings[key].pendingfriend
        }).then(
          alert("Request Denied"),
          navigate("/InternalHomePage", {state: {name: location.state.name}})
         )
      }

  
  return <div>
    <h2 className = "usernameinfo">Welcome, {location.state.name}!</h2>
    <h3>Want to add a friend? Insert their username here: </h3>
    <input type = "text" name = "username" onChange={(e) => {
                setFrienduser(e.target.value)
              }}/>
    <button onClick={submitInformation}>Add!</button>
    <h3>Your sent requests: </h3>

    {sents.map((sent, key) => (
                 <h6>{sent.pendingfriend}</h6> 
                ))}


    <h3>Your pending requests: </h3>

    {pendings.map((pending, key) => (
            <div>
              <h6>{pending.senderusername}</h6> 
              {/* <h6>{key}</h6> */}
              {/* <h6>{pendings[0]}</h6> */}
              <button onClick={event => AcceptFriend(event, {key})}>Accept</button>
              <button onClick={event => DeclineFriend(event, {key})}>Decline</button>

             </div>
            ))
            }

    <h3 className= "moviespre">Trending Movies for this week: </h3>
    <button className='likedbutton'  onClick={routeChange}>Your Rated Movies</button>
    <button className='likedbutton'  onClick={routeChange2}>Your Friends' Rated Movies</button>

    {movies?.length > 0 && movies.map((movie)=>
      <Movie  key={movie.id} {...movie}/> 
      // <Movie  key={1} {...location.state.name}/>
)}
  </div>

  



}

export default InternalHomePage;