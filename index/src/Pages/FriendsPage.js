import {useEffect, useState} from 'react';
import '../Styles/Contact.css';
import {useLocation} from 'react-router-dom';
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function FriendsPage (){

    //creating use states for the friends, works like an array
    const [friendones, setFriendOne] = useState([]);
    const [friendtwos, setFriendTwo] = useState([]);

    //using usenavigate for redirection
    const navigate = useNavigate();

    //using use lovation to access the username passed to the page
    const location = useLocation();
    console.log(location.state.name)

    //redirection to friends page, and sending the username as a parameter
    const ViewFriendLikes = (event, param) =>{ 
        event.preventDefault();
        navigate("/ViewFriends", {state: {param: param, name: location.state.name}})
      }

      //using axios to call the get friend one function of my backend server and setting the results to the previous use state arrays
    useEffect(() => {
        Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/getfriendone', {
          friendone: location.state.name
        }).then(res => {
            console.log(res.data.length)
            setFriendOne(res.data);
        })
        },[]);



        //using axios to call remove friend in express backend and then alerting user that the friend has been removed
        const RemoveFriend = (event, friend ) =>{ 
            event.preventDefault();
            console.log(location.state.name)
            console.log(friend)
            Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/removefriend', {
              user: location.state.name, 
              friend: friend
            }).then(
              alert("Friend Removed"),
              //reloading page to remove the friend from the page. 
              window.location.reload(false)
              )
          }




      //using axios to call the get friend two function of my backend server and setting the results to the previous use state arrays
        useEffect(() => {
            console.log("called 2")
            Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/getfriendtwo', {
              friendtwo: location.state.name
            }).then(res => {
                console.log("friend two")
                setFriendTwo(res.data);
                console.log(friendtwos);
            })
            },[]);

            //redirecting on click
            const routeChange = (event) =>{ 
                event.preventDefault();
                navigate("/InternalHomePage", {state: {name: location.state.name}})
              }

        //displaying all words and buttongs for the page
        return(
            <div>
                <h2>{location.state.name}'s Friends</h2>
                <button className='likedbutton'  onClick={routeChange}>Return to Home</button>
                {friendtwos.map((friendtwo, key) => (
                    <div>
                 <h2>{friendtwo.friendone}</h2> 
                 <button onClick={event => ViewFriendLikes(event, friendtwo.friendone)}>View Ratings</button>
                 <button onClick={event => RemoveFriend(event, friendtwo.friendone)}>Remove Friend</button>
                 </div>
                ))}
                {/* using map to display all of the elements in the array one by one */}
                {friendones.map((friendone, key) => (
                <div>
                    <h2>{friendone.friendtwo}</h2> 
                    <button onClick={event => ViewFriendLikes(event, friendone.friendtwo)}>View Ratings</button>
                    <button onClick={event => RemoveFriend(event, friendone.friendtwo)}>Remove Friend</button>
                </div>  
                ))}

            </div>
        );




}
export default FriendsPage;