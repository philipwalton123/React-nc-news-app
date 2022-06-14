
import { useState } from 'react'
import { incrementVotes } from "../api-calls/apiCalls"
import colourChooser from "../utils/colour-chooser"

export default function ArticleSection({article}) {
    const background = {"backgroundColor": `${colourChooser(article.article_id)}`}

    const [voted, setVoted] = useState(false)

    function handleVoteClick() {
        if (!voted){
            setVoted(true)
            incrementVotes(article.article_id)
        }
        
    }
    
    return <section className="article-section">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-window">
            <div className="article-image" style={background}>
                <h2>topic: {article.topic}</h2>
                <h3>Upvotes: {voted ? article.votes + 1 : article.votes}</h3>
            </div>
            <div className="article-text">
                <h3>by {article.author}</h3>
                <p>{article.body}</p>
            </div>
            <div className="article-addons">
                <div className="author-pic">
                    <img className="avatar" src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" />
                </div>
                <h4>{article.author}</h4>
                <input onClick={handleVoteClick} type="image" className="inc_vote" src="https://www.nicepng.com/png/detail/522-5221283_search-and-filter-blue-number-1-icon-png.png" alt="vote"/>  
                <h4>Upvote this article</h4>
            </div>
        </div> 
    </section>
}