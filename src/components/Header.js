import { Link } from "react-router-dom";

export default function Header() {
    return <section className="header">
        <Link to="/home">
            <h1>NC News</h1>
        </Link>
        </section>
}