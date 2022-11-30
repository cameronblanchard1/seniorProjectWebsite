import '../Styles/Contact.css';
import {useLocation} from 'react-router-dom';

function SavePage (){


//PAGE WAS NOT USED, left in because it is in the deployed file
const location = useLocation()
const { from } = location.state
    return(
        <div className='contact-container'>
<h2>{from}</h2>
        </div>
    );
}

export default SavePage;