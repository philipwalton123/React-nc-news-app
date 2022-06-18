import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {

    const [waiting, setWaiting] = useState(true)
    useEffect(()=>{
        setTimeout(() => {
            setWaiting(false)}, 750)
    },[])

    return waiting ? null : <section className='error-wrapper'>
    <h2>oops... you got lost</h2>
    <Link to='/home'>
        <h3> go home </h3>
    </Link>
    </section>
}