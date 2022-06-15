import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInUserContext } from "../contexts/LoggedInUser";


export default function Header() {

    const {loggedInUser} = useContext(LoggedInUserContext)

    return <section className="header">
        <section className='logged-in-user'>
            <img className='author-pic' src={loggedInUser.avatar_url}></img>
            <p>{loggedInUser.username}</p>
        </section>
        <Link to="/home">
            <h1>NC News</h1>
        </Link>
        </section>
}