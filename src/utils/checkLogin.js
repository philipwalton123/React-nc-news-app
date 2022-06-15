export default function handleUserNameFieldChange(event,setUserNameField, users, setLoginIsValid) {
    event.preventDefault()
    setUserNameField(event.target.value)
    console.log(event.target.value)
    const givenName = event.target.value
    console.log(users)
    if (users.some(user=> user.username == givenName)) {
        setLoginIsValid(true)
        console.log('validated!')
    } else {
        setLoginIsValid(false)
    }
}