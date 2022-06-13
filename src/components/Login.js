import { Link } from "react-router-dom";

export default function Login() {
    return <section className="login-wrapper">
        <form>
            <div className="input-area">
                <input type="text" className="input-field" value="username"></input>
                <input type="text" className="input-field" value="password"></input>
            </div>
            <div className="login-buttons">
                <Link to="/home">
                <button className="action-button" id="login-button">Login</button>
                </Link>
                <Link to="/home">
                <button className="action-button" id="guest-button">Guest</button>
                </Link>
            </div>
        </form>
    </section>
}