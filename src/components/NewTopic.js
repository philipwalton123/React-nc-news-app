import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllTopics, postNewTopic } from "../api-calls/apiCalls";
import { LocationContext } from "../contexts/Location";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import Header from "./Header";
import NavBar from "./NavBar";

export default function NewTopic() {

    const [topics, setTopics] = useState([])
    const [currentText, setCurrentText] = useState({slug: '', description: ''})
    const [submitted, setSubmitted] = useState(false)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const [failedSubmit, setFailedSubmit] = useState(false)
    const [validSlug, setValidSlug] = useState('na')
    const [validDescription, setValidDescription] = useState('true')
    const [titleTaken, setTitleTaken] = useState(false)
    const {setLocation} = useContext(LocationContext)
    const navigate = useNavigate()

    useEffect(()=>{
        getAllTopics()
        .then(({data:{topics}}) => {
            setTopics(topics)
        })
    },[setLocation])

    function updateText(event) {
        if (event.target.id === 'slug-field') {
            setCurrentText(currentFields => {
            const temp = {...currentFields}
            temp.slug = event.target.value
            return temp
            })
        } else {
            setCurrentText(currentFields => {
                const temp = {...currentFields}
                temp.description = event.target.value
                return temp
            })
        }
    }

    function handleTopicSubmit(event) {
        event.preventDefault()
        setValidDescription(true)
        setValidSlug(true)
        if (topics.some(topic=> {
            console.log(topic.slug.toLowerCase())
            console.log(currentText.slug.toLowerCase())
            return topic.slug.toLowerCase() === currentText.slug.toLowerCase()
        })) {
            setTitleTaken(true)
        } else setTitleTaken(false)

        if (loggedInUser.username === 'guest') {
            setFailedSubmit(true)
        } else setFailedSubmit(false)
        
        if (currentText.slug === '' || currentText.description === '') {
            if (currentText.slug === '') {
                setValidSlug(false)
            } else setValidSlug(true)
            if (currentText.description === '') {
                console.log('not a valid body')
                setValidDescription(false)
            } else setValidDescription(true)
        }

        console.log(currentText.description)
        console.log(validDescription)
        if (!titleTaken && !failedSubmit && currentText.slug !== '' & currentText.description !== '') {
            console.log (currentText)
            setValidSlug(true)
            setValidDescription(true)
            setLocation('home')
            postNewTopic(currentText).then(()=> {
                setFailedSubmit(false)
                setSubmitted(true)
                setCurrentText({slug: '', description: ''})
                navigate('/home')
            })
        }
    }

    return <>
        <Header />
        <NavBar />
        <section id="write-new-topic" className="write-comment-wrapper">What is your new topic?
            <form className='comment-form' onSubmit={handleTopicSubmit}>
                <textarea id='slug-field' type='text' className="comment-field" value={currentText.title} onChange={updateText} placeholder="Topic"></textarea>
                <textarea id='description-field' type='text' className="comment-field" value={currentText.body} onChange={updateText} placeholder="Description"></textarea>
                <button type='submit' className='action-button'>Submit</button>
            </form>
            {!validSlug ? <p>A Title must be provided</p> : null}
            {!validDescription? <p>An article body must be provided</p> : null}
            {titleTaken? <p>A topic already exists with this title</p> : null}
            {failedSubmit ? <p>You must be <Link id="purple" to='/'>logged in</Link> to post an article.</p> : null}
            {submitted ? <p>Success!</p> : null}
        </section>
    </>
}