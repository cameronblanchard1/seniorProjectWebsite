import {useEffect, useState} from 'react';
import '../Styles/Contact.css';
import {useLocation} from 'react-router-dom';
import Axios from "axios";

function PersonalProfile (){

    const [ratings, setRatings] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const location = useLocation();
    console.log(location.state.name)
    useEffect(() => {
    Axios.post('https://cors-anywhere.herokuapp.com/https://git.heroku.com/lets-make-movie-magic.git/yourmovies', {
      username3: location.state.name
    }).then(res => {
        console.log(res.data.length)
        setRatings(res.data);
    })
    },[]);
    
    useEffect(() => {
        Axios.post('https://cors-anywhere.herokuapp.com/https://git.heroku.com/lets-make-movie-magic.git/yourdislikes', {
          username3: location.state.name
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





        return(
            <div>
                <h2>{location.state.name}'s Ratings</h2>
                <h3>Likes</h3>
                {ratings.map((rating, key) => (
                 <h2>{rating.movieName}</h2> 
                ))}
                {/* <button className="button" onClick={event => RemoveLike(location.state.name, rating.movieName)}>Remove Liked Movie</button> */}

                <h3>Dislikes</h3>
                {dislikes.map((dislikes, key) => (
                 <h2>{dislikes.movieName}</h2> 
                ))}
                 {/* <button className="button" onClick={event => RemoveDisike(location.state.name, rating.movieName)}>Remove Liked Movie</button> */}

            </div>
        );




}

export default PersonalProfile;