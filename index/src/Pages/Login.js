import React, { useState } from "react";
import "../Styles/Login.css"; 
import LogInClapper from "./LogInClapper.png";
import Axios from "axios";
import { createSearchParams, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //on click, submitting log in information and querying db
  const submitInformation = (event) =>{
    event.preventDefault();
    Axios.post('https://nameless-coast-53768.herokuapp.com/https://lets-make-movie-magic.herokuapp.com/login', {
      username: username, 
      password: password
    }).then(res => {
      if(res.data.message === "Invalid input. Please try again") {
        //if login info is invalid, displaying
        alert("Invalid input. Please try again.")  
        console.log(res.data)
        navigate("/Login");
      }  else{
        //navigate to internal home page, setting login parameter to true.
          navigate("/InternalHomePage", {state: {name: username, pass: password, isLoggedIn: true}});

      }
      // navigate("/Contact");
        });
    
    
  };

  //displaying login display and images
      return (
      <form className = "login">
        {/* <h3 className= "loginheader">Director's Cut</h3> */}
        <img className = "clapperimage" src = {LogInClapper} alt = "directors clapper" />
        <div className="test">
          {/* <image src = {LogInClapper}/> */}
              <h2 className = "loginhead">Login</h2>
              <div>
              <h6 id="emailtext">Username: </h6>
              <input type = "text" name = "username" id = "email" onChange={(e) => {
                setUsername(e.target.value)
              }}/>
              </div>
              <div>
              <h6 id="passwordtext">Password: </h6>
              <input type = "password" name = "password" id = "password"onChange={(e) => {
                setPassword(e.target.value)
              }}/>
              </div>
              <button onClick={submitInformation} id = "loginbutton">Login!</button>
          </div>
      </form>
    )
  
}
export default Login;