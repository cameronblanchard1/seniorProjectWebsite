//importing pages style
import '../Styles/Contact.css';

//this is a very simple page, merely displaying my photo and words
function Contact (){
    return(
        <div className='contact-container'>
        <div>
            <img className = "headshot" src={require('./blanchard_headshot.png')} />
            <img className = "orange" src={require('./orangecontact.png')} />
            <img className = "yellow" src={require('./yellowcontact.png')} />
        <div className = "contacttext">
            <h1>Hi there!</h1>
            <h2>My name is Cameron Blanchard.</h2>
            <h3>I am a senior computer science student, and Movie Magic is my senior project!</h3>
            <p>I chose to create this website because I didn't have any prior experience with front-end development,
                and I wanted to expand my knowledge! Thank you to Dr. Feng Wang, Dr. Charles Walter, and Dr. Timothy Holston at the 
                University of Mississippi for your help and guidance throughout this project!
                If you would like more information on how this project was created, please reach out at cpblanch@go.olemiss.edu.
            </p>
            <h3>I hope you enjoy Movie Magic!</h3>
        </div>
        </div>
        </div>
    );
}

export default Contact;