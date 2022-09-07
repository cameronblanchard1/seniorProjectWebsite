import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";

function App(){
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/Contact" element = {<Contact />} />
        <Route path = "/Login" element = {<Login />} />
      </Routes>
    </Router>
  );
}

export default App;