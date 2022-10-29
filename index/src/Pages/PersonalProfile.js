import '../Styles/Contact.css';
import {useLocation} from 'react-router-dom';


function PersonalProfile (){

    const location = useLocation();


    return(
        <div>
            <h2>Your Rated Movies</h2>
        </div>
    );
}

export default PersonalProfile;