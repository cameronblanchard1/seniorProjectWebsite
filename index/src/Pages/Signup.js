import React, { useState } from "react";
import "../Styles/Login.css"; 
import LogInClapper from "./LogInClapper.png";

function Signup() {

      return (
      <form className = "login">
        {/* <h3 className= "loginheader">Director's Cut</h3> */}
        <img className = "clapperimage" src = {LogInClapper} alt = "directors clapper" />
        <div className="test">
          {/* <image src = {LogInClapper}/> */}
              <h2 className = "loginhead">Sign Up</h2>
              <div>
              <h6 id="emailtext">Username: </h6>
              <input type = "text" name = "email" id = "email"/>
              </div>
              <div>
              <h6 id="passwordtext">Password: </h6>
              <input type = "password" name = "password" id = "password"/>
              </div>
          <input type= "submit" id = "loginbutton" value = "Sign up!"/>
          </div>
      </form>
    )
  
    }
export default Signup;