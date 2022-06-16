import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CommentsSection({comments, article_id}) {
    const [commentsHidden, setCommentsHidden] = useState(true)

    const navigate = useNavigate()

    function handleRevealClick(){
        setCommentsHidden(!commentsHidden)
    }

    function handleCommentClick(){
        navigate(`/comment/${article_id}`)
    }
    
    return <section className={commentsHidden ? 'comments-wrapper' : 'comments-wrapper--open'}>
        <section className="comments-bar">
            <div className="comments-bar-top">
               <button className="action-button" id='reveal-comments' onClick={handleRevealClick}>Comments</button> 
               <button className="action-button" id='write-a-comment' onClick={handleCommentClick}>+</button>
            </div>
            
            <ul className="comments-list">
                {
                    comments.map(comment => {
                        return (
                            <div key={comment.comment_id}>
                                <p>{comment.body}</p>
                                <p>{comment.author}</p>
                            </div>
                            )
                    })
                  
                }
            </ul>
        </section>
    </section>
}