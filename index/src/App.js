import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import InternalHomePage from "./Pages/InternalHomePage";
import PersonalProfile from "./Pages/PersonalProfile";

function App(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/Contact" element = {<Contact />} />
        <Route path = "/Signup" element = {<Signup />} />
        <Route path = "/Login" element = {<Login />} />
        <Route path = "/InternalHomePage" element = {<InternalHomePage />} />
        <Route path = "/PersonalProfile" element = {<PersonalProfile />} />
      </Routes>
    </Router>
  );
}

export default App;