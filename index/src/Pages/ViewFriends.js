//importing required packages
import {useEffect, useState} from 'react';
import '../Styles/Contact.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from "axios";

function ViewFriends (){

  //setting arrays
    const [ratings, setRatings] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    //using navigate and location
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.param)
    console.log(location.state.name);

    //getting the friends likes
    useEffect(() => {
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourmovies', {
      username3: location.state.param
    }).then(res => {
        console.log(res.data.length)
        setRatings(res.data);
    })
    },[]);
    
    //getting the friends dislikes
    useEffect(() => {
        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourdislikes', {
          username3: location.state.param
        }).then(res => {
            // console.log(res.data)
            console.log(res.data.length)
            setDislikes(res.data);

        })
        },[]);

        //redirecting on click and sending username
        const routeChange = (event) =>{ 
          event.preventDefault();
          navigate("/InternalHomePage", {state: {name: location.state.name}})
        }
        

        //displaying all information on friends page
        return(
            <div>
            <h2>Your Friend {location.state.param}'s Likes</h2>
            <button className='likedbutton'  onClick={routeChange}>Return to Home</button>
            <br></br>
            <h3>Likes</h3>
                {ratings.map((rating, key) => (
                 <h2>{rating.moviename}</h2> 
                ))}
                {/* <button className="button" onClick={event => RemoveLike(location.state.name, rating.movieName)}>Remove Liked Movie</button> */}
                <br></br>

                <h3>Dislikes</h3>
                {dislikes.map((dislikes, key) => (
                 <h2>{dislikes.moviename}</h2> 
                ))}
                 {/* <button className="button" onClick={event => RemoveDisike(location.state.name, rating.movieName)}>Remove Liked Movie</button> */}

                </div>
        );
}
export default ViewFriends;