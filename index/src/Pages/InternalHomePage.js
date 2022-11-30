//importing necessary packages
import {useEffect, useState} from 'react';
import '../Styles/InternalHomePage.css';
import Movie from './Script';
import {useLocation, browserHistory} from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

//getting the top rated movies of the week from the movie db api with my api key
const TOP_RATED_API="https://api.themoviedb.org/3/trending/movie/week?api_key=5ad343d5a012d9491667c2c470dc0273"


function InternalHomePage() {
  //setting user state arrays 
  const [movies, setMovies] = useState([]);
  const [tests, setTests] = useState([]);
  const [frienduser, setFrienduser] = useState('');
  const [sents, setSent] = useState([]);
  const [pendings, setPending] = useState([]);

  //creating location and navigate 
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.name;

  //changing route on click and sending username parameter
  const routeChange = (event) =>{ 
    event.preventDefault();
    navigate("/PersonalProfile", {state: {name: location.state.name}})
  }

  //changing route on click and sending username parameter
  const routeChange2 = (event) =>{ 
    event.preventDefault();
    navigate("/FriendsPage", {state: {name: location.state.name}})
  }

  //fetching the information from the api, setting it to json so that it can be set to the array of movies
  useEffect(()=>{
    fetch(TOP_RATED_API)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results);
      });
    },[]);


    //inputs friend request into pending friend database
    const submitInformation = (event) =>{
      console.log(frienduser)

      //makes sure a username was input
      if (frienduser != ""){
      event.preventDefault();
      console.log(user)
      console.log(frienduser)
      Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/pending', {
        username: user, 
        pendingfriend: frienduser
      }).then(res => {
        if(res.data === 2) {
          //alerts that request was sent and reloads so that it is reflected on the page
          alert("Request Sent!") 
          window.location.reload(false)
        }  else{
          //alerts that the user doesnt exist and reloads to empty textbox
          alert("This user does not exist. Please try again.")
          window.location.reload(false)
        }

    })
      } else{
      alert("Must enter a username.")
    }
  }


  //getting information from databse to see who the user has sent requests to, stores to array to display on screen
  useEffect(() => {
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yoursentrequests', {
      username: user
    }).then(res => {
        // console.log(res.data)
        console.log(res.data.length)
        console.log(res.data)
        setSent(res.data);
        // });
    })
    },[]);

  //getting information from databse to see who  has sent the user requests, stores to array to display on screen
    useEffect(() => {
      Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourpendingrequests', {
        username: user
      }).then(res => {
          console.log(res.data.length)
          console.log(res.data)
          setPending(res.data);
          // });
      })
      },[]);


      //adding friend by querying db 
      const AcceptFriend = (event, {key}) =>{ 
        event.preventDefault();
        console.log(pendings[key].senderusername)
        console.log(pendings[key].pendingfriend)


        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/addfriends', {
          friend1: pendings[key].senderusername, 
          friend2: pendings[key].pendingfriend
        }).then(
          //alerting and reloading to show on screen
          alert("Friend Added!"),
          window.location.reload(false)
          )
        } 

        //declining friend 
      const DeclineFriend = (event, {key}) =>{ 
        event.preventDefault();

        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/rejectrequest', {
          friend1: pendings[key].senderusername, 
          friend2: pendings[key].pendingfriend
        }).then(
          //alerting and reloading to show on screen
          alert("Request Denied"),
          window.location.reload(false)
          )
      }

  console.log("CHECKING IF LOGGED IN")
 console.log(location.state.isLoggedIn)

 //changing log in boolean when logging out
 const logout = (event) =>{ 
  event.preventDefault();
  navigate("/", {state: {isLoggedIn: false}}, { replace: true });
  alert("Logged out.")
  console.log("here")

  
}

//displaying all page information and buttons
      return <div>
      <h2 className = "usernameinfo">Welcome, {location.state.name}!</h2>
      {/* <br></br> */}
      <button className='likedbutton'  onClick={logout}>Log Out</button>
      <br></br>

      <button className='likedbutton'  onClick={routeChange}>Your Rated Movies</button>
      <br></br>

      <button className='likedbutton'  onClick={routeChange2}>Your Friends' Rated Movies</button>
      <br></br>

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
  
{/* displaying the movies  */}
      {movies?.length > 0 && movies.map((movie)=>
        <Movie  key={movie.id} {...movie}/> 
        // <Movie  key={1} {...location.state.name}/>
  )}
    </div>
  }


export default InternalHomePage;