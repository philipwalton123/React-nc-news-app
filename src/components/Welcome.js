import { useContext, useEffect } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import Banner from "./Banner";
import Login from "./Login";

export default function Welcome(){

    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)

    useEffect(()=>{
        setLoggedInUser({username: 'guest', avatar_url: "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"})
    }, [])

    return <div className='welcome-wrapper'>
        <Banner />
        <Login />
    </div>
}