import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCommentsByArticleId } from "../api-calls/apiCalls"

export default function CommentsSection({splat, article_id}) {
    const [commentsHidden, setCommentsHidden] = useState(true)
    const [theseComments, setTheseComments] = useState([])
    const [commentsLimit, setCommentsLimit] = useState(10)
    const navigate = useNavigate()

    useEffect(()=>{
        getCommentsByArticleId(splat, commentsLimit)
            .then(({data: {comments}})=> {
                
                setTheseComments(comments)
            })
    },[commentsLimit])

    function handleRevealClick(){
        setCommentsHidden(!commentsHidden)
        if (commentsHidden) {
            setCommentsLimit(10)
        }
    }

    function handleCommentClick(){
        navigate(`/comment/${article_id}`)
    }

    function handleClickForMore() {
       setCommentsLimit((current) => current + 10)
    }
    
    return <section className={commentsHidden ? 'comments-wrapper' : 'comments-wrapper--open'}>
        <section className="comments-bar">
            <div className="comments-bar-top">
               <button className="action-button" id='reveal-comments' onClick={handleRevealClick}>Comments</button> 
               <button className="action-button" id='write-a-comment' onClick={handleCommentClick}>+</button>
            </div>
            
            <ul className="comments-list">
                {
                    theseComments.map(comment => {
                        return (
                            <div key={comment.comment_id}>
                                <p>{comment.body}</p>
                                <p>{comment.author}</p>
                            </div>
                            )
                    })
                  
                }
            </ul>
            <button className='action-button' id='next-page-button' onClick={handleClickForMore}>See More</button>
        </section>
    </section>
}