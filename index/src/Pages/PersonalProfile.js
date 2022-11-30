import {useEffect, useState} from 'react';
import '../Styles/PersonalProfile.css';
import {useLocation} from 'react-router-dom';
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function PersonalProfile (){

  //creating use state arrays and navigate for redirection
    const [ratings, setRatings] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state.name)

    //querying db to get the users liked and disliked movies
    useEffect(() => {
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourmovies', {
      username3: location.state.name
    }).then(res => {
        console.log(res.data.length)
        setRatings(res.data);
    })
    },[]);
    
    useEffect(() => {
        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourdislikes', {
          username3: location.state.name
        }).then(res => {
            // console.log(res.data)
            console.log(res.data.length)
            setDislikes(res.data);
        })
        },[]);


        //querying db to remove a movie from likes and dislikes, alerting user, then reloading page ro reflect change
      const RemoveLike = (event, name, movie) =>{ 
        event.preventDefault();
        console.log(name);
        console.log(movie);

        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/removelike', {
            name: name, 
            moviename: movie
          }).then(
            alert("Movie removed from likes."),
            window.location.reload(false)
           )

        } 

        const RemoveDisike = (event, name, movie) =>{ 
            event.preventDefault();
            console.log(name);
            console.log(movie);

            Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/removedislike', {
                name: name, 
                moviename: movie
              }).then(
                alert("Movie removed from dislikes."),
                window.location.reload(false)
                )

    
            } 


            //changing page on click, and sending username to page
            const routeChange = (event) =>{ 
                event.preventDefault();
                navigate("/InternalHomePage", {state: {name: location.state.name}})
              }

              //displaying all words and buttons on the personal profile  
        return(
            <div>
                <h2 className = "ratings">{location.state.name}'s Ratings</h2>
                <button className='likedbutton'  onClick={routeChange}>Return to Home</button>
                <br></br>

                <h3>Likes</h3>
                {ratings.map((rating, key) => (
                <div className='movies'>
                 <h2>{rating.moviename}</h2>  
                 <button className="buttons" onClick={event => RemoveLike(event, location.state.name, rating.moviename)}>Remove</button>                 
                 </div>
                ))}
<br></br>
<br></br>

                <h3>Dislikes</h3>
                {dislikes.map((dislikes, key) => (
                <div className='movies'>
                    <h2>{dislikes.moviename}</h2> 
                    <button className="buttons" onClick={event => RemoveDisike(event, location.state.name, dislikes.moviename)}>Remove</button>
                 </div>
                ))}

            </div>
        );




}

export default PersonalProfile;