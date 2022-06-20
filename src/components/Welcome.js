import Banner from "./Banner";
import Login from "./Login";

export default function Welcome(){

    return <div className='welcome-wrapper'>
        <Banner />
        <Login />
        <p>This is a portfolio project for demonstration purposes</p>
        <p>Click guest for a preview.</p>
        <p>To see all features as a user, login as grumpy19, tickle122, or happyamy2016</p>
    </div>
}