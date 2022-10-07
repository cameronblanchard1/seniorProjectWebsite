import React, { useState } from "react";
import "../Styles/Login.css"; 
import LogInClapper from "./LogInClapper.png";
import Axios from "axios";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitInformation = () =>{
    Axios.post('http://localhost:3001/login', {
      username: username, 
      password: password
    }).then(() => {
      console.log(username);
    })
  };
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
  

//     const [user, setUser] = useState({name: '', email: ''});
//     const [error, setError] = useState('');

//     const Login = details => {
//       console.log(details);
//     }

//     const Logout = () => {
//       console.log("Logout");
//     }

  

//     return (
//     <div className = "Login">
//       {/* //if the user email is not null, then render */}
//       {(user.email != "") ? (
//         <div className = "helloScreen">
//           <h2>Hello, <span>{user.name}!</span></h2>
//         </div>
//     ) : (
//       <LoginForm Login = {Login}/>
//     )}
//     </div>
// )};
}
export default Login;