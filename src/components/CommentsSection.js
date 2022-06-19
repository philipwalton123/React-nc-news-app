import { useEffect, useState, useContext  } from "react"
import { useNavigate } from "react-router-dom"
import { deleteCommentById, getCommentsByArticleId } from "../api-calls/apiCalls"
import { LoggedInUserContext } from "../contexts/LoggedInUser"

export default function CommentsSection({splat, article_id}) {
    const [commentsHidden, setCommentsHidden] = useState(true)
    const [theseComments, setTheseComments] = useState([])
    const [commentsLimit, setCommentsLimit] = useState(10)
    const [deleting, setDeleting] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        getCommentsByArticleId(splat, commentsLimit)
            .then(({data: {comments}})=> {
                
                setTheseComments(comments)
                setRefresh(false)
            })
    },[commentsLimit, refresh, splat])

    function handleRevealClick(){
        setCommentsHidden(!commentsHidden)
        if (commentsHidden) {
            setCommentsLimit(10)
        }
    }

    function handleCommentClick(){
        navigate(`/comment/${article_id}`)
    }

    function handleClickForMore(event) {
        event.preventDefault()
       setCommentsLimit((current) => current + 10)
    }

    function handleClickDelete(comment_id) {
       setDeleting(true)
       setRefresh(true)
       deleteCommentById(comment_id)
       .then(()=>{
        setDeleting(false)
       })
    }

    const commentsBar = document.getElementById('comments-bar')

    function handleHideComments(event) {
        event.preventDefault()
        commentsBar.scrollTo({
            top:0,
            behaviour: 'smooth'
        })
        setCommentsHidden(true)
    }

    return <section className={commentsHidden ? 'comments-wrapper' : 'comments-wrapper--open'}>
        <section className="comments-bar" id="comments-bar">
            <div className="comments-bar-top">
               <button className="action-button" id='reveal-comments' onClick={handleRevealClick}>Comments {commentsHidden ? '...' : '^'}</button> 
               <button className="action-button" id='write-a-comment' onClick={handleCommentClick}>+</button>
            </div>
            
            <ul className="comments-list">
                {
                    theseComments.map(comment => {
                        return (
                            <li className="comment-card" key={comment.comment_id}>
                                {comment.author === loggedInUser.username ? <button className='action-button' id="flip-button" onClick={()=>{handleClickDelete(comment.comment_id)}}>Delete</button> : null}
                                <div className="comment-text">
                                    {deleting ? <p>deleting...</p> : <>
                                    <p>{comment.body}</p>
                                    <p>{comment.author}</p>
                                    </>}
                                    
                                </div>
                            </li>
                            )
                    })
                }
            </ul>
            <section className='comments-bottom'>
            <button className='action-button' id='next-page-button' onClick={handleClickForMore}>See More</button>
            <button className='action-button' id='next-page-button' onClick={handleHideComments}>Hide</button>
            </section>
           
        </section>
    </section>
}