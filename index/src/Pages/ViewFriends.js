import {useEffect, useState} from 'react';
import '../Styles/Contact.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Axios from "axios";

function ViewFriends (){

    const [ratings, setRatings] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.param)
    console.log(location.state.name);

    useEffect(() => {
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourmovies', {
      username3: location.state.param
    }).then(res => {
        console.log(res.data.length)
        setRatings(res.data);
    })
    },[]);
    
    useEffect(() => {
        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourdislikes', {
          username3: location.state.param
        }).then(res => {
            // console.log(res.data)
            console.log(res.data.length)
            //try a for loop with size less than res.data
            // for (let i = 0; i < 1; i++) {
            //     setRatings(res.data);
            //     return;
            // } 
            setDislikes(res.data);
            // });
        })
        },[]);

        const routeChange = (event) =>{ 
          event.preventDefault();
          navigate("/InternalHomePage", {state: {name: location.state.name}})
        }
        

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