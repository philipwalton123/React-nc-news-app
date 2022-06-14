
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../api-calls/apiCalls";
import { UsersContext } from "../contexts/Users";
import checkLogin from "../utils/checkLogin";



export default function Login() {

    const [userNameField, setUserNameField] = useState("")
    const [users, setUsers] = useState([])
    const [loginIsValid, setLoginIsValid] = useState(null)

    console.log(loginIsValid)

    useEffect(()=>{
        getAllUsers().then(users => {
            setUsers(users)
        })
    },[])

    function handleLoginSubmit(event){
        event.preventDefault()
        const valid = checkLogin(event, users, loginIsValid, setLoginIsValid)
        console.log(valid, '<<<valid')
        if (valid) {
            console.log('validlogin') 
        } else {
            console.log('invalidlogin')
        }
        
        
        
        
    }


    return <section className="login-wrapper">
        <form value={userNameField} onSubmit={handleLoginSubmit}>
            <div className="input-area">
                <input type="text" className="input-field" value={userNameField} placeholder='username' onChange={(event)=>{setUserNameField(event.target.value)}}></input>
                <input type="text" className="input-field" value="password"></input>
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
    </section>
}

