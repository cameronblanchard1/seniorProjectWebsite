import React from 'react';
import siteLogo from '../visuals/placeholder.png'

function navBar() {
  return (
    <div>
        <nav className = "navBar">
            <div className = "fullScreenMode">
                <img src = {siteLogo}></img>
            </div>
            



            <div className = "minimizedMode"></div>
        </nav>
    </div>
  )
}

export default navBar