import {Link} from 'react-router-dom'

export default function NavBar() {
    return <section className="nav-bar">
        <Link to="/topics">
            <button className="action-button">Topics</button>
        </Link>
        <div className="button-spacer"></div>
        <Link to="/authors">
            <button className="action-button">Authors</button>
        </Link>
        <div className="button-spacer"></div>
        <Link to="/post">
            <button className="action-button">Post</button>
        </Link>
        
    </section>
}