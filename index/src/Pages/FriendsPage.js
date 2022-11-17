import {useEffect, useState} from 'react';
import '../Styles/Contact.css';
import {useLocation} from 'react-router-dom';
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function FriendsPage (){

    // const [ratings, setRatings] = useState([]);
    // const [dislikes, setDislikes] = useState([]);
    const [friendones, setFriendOne] = useState([]);
    const [friendtwos, setFriendTwo] = useState([]);
    const navigate = useNavigate();

    const location = useLocation();
    console.log(location.state.name)

    const ViewFriendLikes = (event, param) =>{ 
        event.preventDefault();
        navigate("/ViewFriends", {state: {param: param}})
      }

    useEffect(() => {
        Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/getfriendone', {
          friendone: location.state.name
        }).then(res => {
            console.log(res.data.length)
            setFriendOne(res.data);
        })
        },[]);

        useEffect(() => {
            console.log("called 2")
            Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/getfriendtwo', {
              friendtwo: location.state.name
            }).then(res => {
                console.log("friend two")
                setFriendTwo(res.data);
                console.log(friendtwos);
            })
            },[]);



        return(
            <div>
                <h2>{location.state.name}'s Friends</h2>
                {friendtwos.map((friendtwo, key) => (
                    <div>
                 <h2>{friendtwo.friendone}</h2> 
                 <button onClick={event => ViewFriendLikes(event, friendtwo.friendone)}>View Ratings</button>
                 </div>
                ))}
                {friendones.map((friendone, key) => (
                <div>
                    <h2>{friendone.friendtwo}</h2> 
                    <button onClick={event => ViewFriendLikes(event, friendone.friendtwo)}>View Ratings</button>
                </div>  
                ))}

            </div>
        );




}
export default FriendsPage;