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
        if (loggedInUser.username === 'guest' || event.target[0].value === '') {
            setIsError(true)
            console.log('error')
        } else {
            console.log('submitting')
            setIsError(false)
            const text = event.target[0].value
            postCommentOnArticle(thisArticle.article_id, loggedInUser.username, text)
            setCurrentText('')
            setSubmitted(true)
        }
        
        
    }

    return<>
        <Header />
        <NavBar />
        <section className="write-comment-wrapper">What would you like to say about {thisArticle.title}?
            <form className='comment-form' onSubmit={handleCommentSubmit}>
                <textarea type='text' className="comment-field" value={currentText} onChange={updateText}></textarea>
                <button type='submit' className='action-button'>Submit</button>
            </form>
            {submitted ? <p>Success!</p> : null}
            {isError ? <p>You must be <Link to='/'>logged in</Link> to submit a comment. Comments cannot be empty.</p> : null}
        </section>
        
    </>
}