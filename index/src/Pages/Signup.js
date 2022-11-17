import React, { useState, useEffect } from "react";
import "../Styles/Login.css"; 
import LogInClapper from "./LogInClapper.png";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Signup() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitInformation = (event) =>{
    event.preventDefault();
    console.log("does this work")
    // https://thingproxy.freeboard.io/fetch/
    // https://cors-anywhere.herokuapp.com/
      Axios.post('https://corsanywhere.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/register', {
      username: username, 
      password: password
    }).then(res => {
        console.log("back in js")
        console.log(res.data)
        if(res.data === 2) {
          alert("Username taken. Please try again.")  
          // console.log(res.data)
          navigate("/Signup");
        }  else{
          alert("Successfully signed up! Please sign in!");
          navigate("/Login");  
        }

    })
  };

      return (
      <form className = "login">
        {/* <h3 className= "loginheader">Director's Cut</h3> */}
        <img className = "clapperimage" src = {LogInClapper} alt = "directors clapper" />
        <div className="test">
          {/* <image src = {LogInClapper}/> */}
              <h2 className = "loginhead">Sign Up</h2>
              <div>
              <h6 id="emailtext">Username: </h6>
              <input type = "text" name = "username" id = "email" onChange={(e) => {
                setUsername(e.target.value)
              }}/>
              </div>
              <div>
              <h6 id="passwordtext">Password: </h6>
              <input type = "password" name = "password" id = "password" onChange={(e) => {
                setPassword(e.target.value)
              }}/>
              </div>
          <button onClick={submitInformation} id = "loginbutton">Sign Up</button>
          </div>
      </form>
    )
  
    }
export default Signup;