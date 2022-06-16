import { useState } from "react"

export default function CommentsSection({comments}) {
    const [commentsHidden, setCommentsHidden] = useState(true)

    function handleClick(){
        setCommentsHidden(!commentsHidden)
    }
    
    return <section className={commentsHidden ? 'comments-wrapper' : 'comments-wrapper--open'}>
        <section className="comments-bar">
            <button className="action-button" onClick={handleClick}>Comments</button>
            <ul className="comments-list">
                {
                    comments.map(comment => {
                        return (
                            <>
                                <p>{comment.body}</p>
                                <p>{comment.author}</p>
                            </>
                            )
                    })
                  
                }
            </ul>
        </section>
    </section>
}