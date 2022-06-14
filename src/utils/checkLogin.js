import {useContext} from 'react'
import { UsersContext } from '../contexts/Users'

export default function checkLogin(event, users, loginIsValid, setLoginIsValid) {
    event.preventDefault()
    console.log(event.target[0].value)
    const givenName = event.target[0].value
    console.log(users)
    if (users.some(user=> user.username == givenName)) {
        setLoginIsValid(true)
    } else {
        setLoginIsValid(false)
    }
    return loginIsValid
}