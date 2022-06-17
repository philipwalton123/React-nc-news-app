import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { LocationContext } from '../contexts/Location'
import { LoggedInUserContext } from '../contexts/LoggedInUser'


export default function NavBar() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {location, setLocation} = useContext(LocationContext)

    return <section className="nav-bar">
        { loggedInUser.username === 'guest' ? 
        <Link to="/welcome">
            <button className="action-button">Sign-In</button>
        </Link> : 
        <Link to="/welcome">
            <button className="action-button">Sign-Out</button>
        </Link>
        }
        <div className="button-spacer"></div>
        { location === 'home' || location === 'post'?
        <Link to="/authors">
            <button className="action-button" onClick={()=>{setLocation('authors')}}>Authors</button>
        </Link> :
        <Link to="/home">
            <button className="action-button" onClick={()=>{setLocation('home')}}>Home</button>
        </Link>
        }
        <div className="button-spacer"></div>
        { location === 'home' || location === 'authors' ? 
        <Link to="/post">
        <button className="action-button" onClick={()=>{setLocation('post')}}>Post</button>
        </Link> :
        <Link to="/home">
        <button className="action-button" onClick={()=>{setLocation('home')}}>Home</button>
        </Link> 
        
        }
        
    </section>
}