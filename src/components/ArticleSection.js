
import { useContext, useEffect, useState } from 'react'
import { decrementVotes, deleteUsersVoteOnArticle, getAllVotes, getUserByUsername, incrementVotes, postUsersVoteOnArticle } from "../api-calls/apiCalls"
import { LoggedInUserContext } from '../contexts/LoggedInUser'
import colourChooser from "../utils/colour-chooser"

export default function ArticleSection({article}) {

    const { loggedInUser } = useContext(LoggedInUserContext)

    const background = {"backgroundColor": `${colourChooser(article.article_id)}`}

    const [voted, setVoted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [votesShowing, setVotesShowing] = useState(null)
    const [articleAuthor, setArticleAuthor]= useState({})

    useEffect(()=>{
            getAllVotes()
            .then(({votes}) => {
            setVoted(votes.some(vote => {return vote.article === article.article_id && vote.voter === loggedInUser.username}))
            setIsLoading(false)
            setVotesShowing(article.votes)
            })
            .then(()=>{
            getUserByUsername(article.author)
            .then(({data: {user}}) => {
                setArticleAuthor(user)
            })
        })
        
        
    },[article, postUsersVoteOnArticle, deleteUsersVoteOnArticle, loggedInUser.username])


    function handleVoteClick() {
            if (!voted){
                setVoted(!voted)
                setVotesShowing(votesShowing + 1)
                incrementVotes(article.article_id)
                if (loggedInUser.username !== 'guest') {
                    postUsersVoteOnArticle(article.article_id, loggedInUser.username)
                }
            } else {
                setVoted(!voted)
                setVotesShowing(votesShowing - 1)
                decrementVotes(article.article_id)
                if (loggedInUser.username !== 'guest') {
                    deleteUsersVoteOnArticle(article.article_id, loggedInUser.username)
                }
            }
    }
    
    return <section className="article-section">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-window">
            <div className="article-image" style={background}>
                <h2>topic: {article.topic}</h2>
                <h3>Upvotes: {votesShowing}</h3>
            </div>
            <div className="article-text">
                <h3>by {articleAuthor.name}</h3>
                <p>{article.body}</p>
            </div>
            <div className="article-addons">
                <div className="author-pic">
                    { isLoading ? null : <img className="avatar" src={articleAuthor.avatar_url} alt={article.username}/>}
                </div>
                <h4>{articleAuthor.name}</h4>
                <input onClick={handleVoteClick} type="image" className="inc_vote" src={!voted ? "https://www.nicepng.com/png/detail/522-5221283_search-and-filter-blue-number-1-icon-png.png" : "https://i.pinimg.com/originals/18/24/35/1824357bea830387f73236953c8b3889.png"} alt="vote"/>  
                <h4>{!voted ? 'Upvote this article' : 'UnVote this article'}</h4>
            </div>
        </div> 
    </section>
}