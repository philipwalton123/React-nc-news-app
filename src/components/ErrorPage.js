import { Link } from "react-router-dom";

export default function ErrorPage() {

    return <section className='error-wrapper'>
    <h2>oops... you got lost</h2>
    <Link to='/home'>
        <h3> go home </h3>
    </Link>
    </section>
}