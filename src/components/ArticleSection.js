import colourChooser from "../utils/colour-chooser"

export default function ArticleSection({article}) {
    const background = {"backgroundColor": `${colourChooser(article.article_id)}`}
    
    return <section className="article-section">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-window">
            <div className="article-image" style={background}>
                <h2>{article.category}</h2>
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
                <input onClick={()=>{console.log('voted')}} type="image" className="inc_vote" src="https://www.nicepng.com/png/detail/522-5221283_search-and-filter-blue-number-1-icon-png.png" alt="vote"/>  
                <h4>Upvote {article.author}</h4>
            </div>
        </div> 
    </section>
}