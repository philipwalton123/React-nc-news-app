
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../api-calls/apiCalls";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import handleUserNameFieldChange from "../utils/checkLogin";
import checkLogin from "../utils/checkLogin";



export default function Login() {

    const [userNameField, setUserNameField] = useState("")
    const [users, setUsers] = useState([])
    const [loginIsValid, setLoginIsValid] = useState(null)
    const [failedLoginAttempt, setFailedLoginAttempt] = useState(false)
    const { setLoggedInUser} = useContext(LoggedInUserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        getAllUsers().then(users => {
            setUsers(users)
        })
    },[])

    function handleLoginSubmit(event){
        event.preventDefault()
        if (loginIsValid) {
            setFailedLoginAttempt(false)
            setLoggedInUser(users.find(user => user.username === userNameField))
            navigate('/home')
        } else {
            setFailedLoginAttempt(true)
        }
        
        
        
        
    }


    return <section className="login-wrapper">
        <form value={userNameField} onSubmit={handleLoginSubmit}>
            <div className="input-area">
                <input type="text" className={`input-field ${failedLoginAttempt ? 'red-border' : ''}`} value={userNameField} placeholder='username' onChange={(event)=>{handleUserNameFieldChange(event,setUserNameField, users, setLoginIsValid)}}></input>
                <input type="text" className="input-field" value="password" onChange={()=>{}}></input>
            </div>
            <div className="login-buttons">
                {/* <Link to="/home"> */}
                <button className="action-button" id="login-button" onBlur={(event)=>checkLogin(event, users, setLoginIsValid)}>Login</button>
                {/* </Link> */}
                <Link to="/home">
                <button className="action-button" id="guest-button">Guest</button>
                </Link>
            </div>
        </form>
        <p>This is a portfolio project for demonstration purposes</p>
        <p>Click guest for a preview.</p>
        <p>To see all features as a user, login as grumpy19, tickle122, or happyamy2016</p>
    </section>
}

