import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllTopics, postNewArticle } from "../api-calls/apiCalls";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import Header from "./Header";
import NavBar from "./NavBar";

export default function PostArticle() {

    const [topics, setTopics] = useState([])
    const [currentText, setCurrentText] = useState({title: '', body: ''})
    const [isError, setisError] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const [topicChoice, setTopicChoice] = useState('coding')
    const [fieldsAreValid, setFieldsAreValid] = useState(false)
    const [failedSubmit, setFailedSubmit] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        getAllTopics()
        .then(({data:{topics}}) => {
            setTopics(topics)
        })
    },[])

    function handleTopicChoose(event) {
        setTopicChoice(event.target.value)
    }

    function updateText(event) {
        if (event.target.id == 'title-field') {
            setCurrentText(currentFields => {
            const temp = {...currentFields}
            temp.title = event.target.value
            return temp
            })
        } else {
            setCurrentText(currentFields => {
                const temp = {...currentFields}
                temp.body = event.target.value
                return temp
            })
        }
    }

    function handleCommentSubmit(event) {
        event.preventDefault()
        const title = event.target[0].value
        const body = event.target[1].value
        const author = loggedInUser.username
        const topic = topicChoice
        const article = {title, body, author, topic}
        console.log(article)
        if (author === 'guest') {
            setFailedSubmit(true)
        } else {
            
            postNewArticle(article).then(()=> {
                setFailedSubmit(false)
                setSubmitted(true)
                setCurrentText({title: '', body: ''})
                navigate('/home')
            })
        }
    }

    console.log('>>>title', currentText.title)
    console.log('>>>body', currentText.body)

    return <>
        <Header />
        <NavBar />
            <section className="post-article-wrapper">
                <section className='options-bar' onChange={handleTopicChoose}>
                <select>
                {topics.map(topic => {
                        return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                    })}
                </select>
                <Link to='/newtopic'>
                    <h1>New Topic?</h1>
                </Link>
                
            </section>
        </section>
        <section className="write-comment-wrapper">What would you like to write?
            <form className='comment-form' onSubmit={handleCommentSubmit}>
                <textarea id='title-field' type='text' className="comment-field" value={currentText.title} onChange={updateText} placeholder="Title"></textarea>
                <textarea id='body-field' type='text' className="comment-field" value={currentText.body} onChange={updateText} placeholder="Body"></textarea>
                <button type='submit' className='action-button'>Submit</button>
            </form>
            {failedSubmit ? <p>You must be <Link id="purple" to='/'>logged in</Link> to post an article.</p> : null}
            {submitted ? <p>Success!</p> : null}
            {isError ? <p>You must be <Link to='/'>logged in</Link> to submit a comment. Comments cannot be empty.</p> : null}
        </section>
    </>
}