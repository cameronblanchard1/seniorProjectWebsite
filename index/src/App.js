import './App.css';
import homePage from './pages/homePage';
import aboutPage from './pages/aboutPage';
import Navbar from './siteAttributes/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
          <Routes>
            {/* the following code is to route links into the nav bar as React does not support routing by default
            path means it is in then home page, exact means there's only one route to be displayed at one time
            component shows what someone would get to when clicking the routing link */}
              <Route  path = "/" element = {homePage}/>
              <Route  path = "/" element = {aboutPage}/>

          </Routes>
      </Router>
    </div>
  );
}

export default App;
