import {useEffect, useState} from 'react';
import '../Styles/PersonalProfile.css';
import {useLocation} from 'react-router-dom';
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function PersonalProfile (){

    const [ratings, setRatings] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state.name)
    useEffect(() => {
    Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourmovies', {
      username3: location.state.name
    }).then(res => {
        console.log(res.data.length)
        setRatings(res.data);
    })
    },[]);
    
    useEffect(() => {
        Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/yourdislikes', {
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



      const RemoveLike = (event, name, movie) =>{ 
        event.preventDefault();
        console.log(name);
        console.log(movie);

        Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/removelike', {
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

            Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/removedislike', {
                name: name, 
                moviename: movie
              }).then(
                alert("Movie removed from dislikes."),
                window.location.reload(false)
                )

    
            } 

        return(
            <div>
                <h2 className = "ratings">{location.state.name}'s Ratings</h2>
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