import Banner from "./Banner";
import Login from "./Login";

export default function Welcome(){
    return <div className='welcome-wrapper'>
        <Banner />
        <Login />
    </div>
}