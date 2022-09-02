import './App.css';
import homePage from './pages/homePage';
import aboutPage from './pages/aboutPage';
import Navbar from './siteAttributes/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {
  return (
    <>
    <Navbar/>
    </>
  );
}

export default App;


{/* <div className="App">
<Router>
  <div>
    <Navbar/>
    <p>This is the landing page</p>
    <Routes>
        <Route  exact path = "/" element = {<homePage />}/>
        <Route  path = "aboutPage" element={<aboutPage/>}/>

    </Routes>
  </div>
</Router>
</div> */}