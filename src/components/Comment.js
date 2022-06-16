import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArticleById, postCommentOnArticle } from "../api-calls/apiCalls"
import { LoggedInUserContext } from "../contexts/LoggedInUser"
import Header from "./Header"
import NavBar from "./NavBar"

export default function Comment() {
    const splat = useParams()['*']
    const [thisArticle, setThisArticle] = useState({})
    const [currentText, setCurrentText] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)
    const {loggedInUser} = useContext(LoggedInUserContext)
    console.log(loggedInUser)

    useEffect(()=> {
        getArticleById(splat)
        .then(({data:{article}}) => {
            setThisArticle(article)
        })
    }, [splat])

    function updateText(event) {
        event.preventDefault()
        setCurrentText(event.target.value)
    }

    function handleCommentSubmit(event) {
        event.preventDefault()
        if (loggedInUser.username === 'guest') {
            setIsError(true)
            console.log('error')
        } else {
            console.log('submitting')
            setIsError(false)
            const text = event.target[0].value
            postCommentOnArticle(thisArticle.article_id, loggedInUser.username, text)
        //setCurrentText('')
        }
        
        
    }

    return<>
        <Header />
        <NavBar />
        <section className="write-comment-wrapper">What would you like to say about {thisArticle.title}?
            <form className='comment-form' onSubmit={handleCommentSubmit}>
                <input type='text' className="comment-field" value={currentText} onChange={updateText}></input>
                <button className='action-button'>Submit</button>
            </form>
            {isError ? <p>You must be <Link to='/'>logged in</Link> to submit a comment</p> : null}
        </section>
        
    </>
}