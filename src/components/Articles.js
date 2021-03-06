import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {get8Articles, getAllArticles} from '../api-calls/apiCalls'
import colourChooser from '../utils/colour-chooser'
import OptionsBar from './OptionsBar'

export default function Articles() {
    
    const [articlesShowing, setArticlesShowing] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [allArticles, setAllArticles] = useState([])
    const [query, setQuery] = useState("")

    useEffect(()=> {
        get8Articles()
        .then(({data: {articles}}) => {
            setArticlesShowing(articles)
            setAllArticles(articles)
            setIsLoading(false)
        })
    }, [])
    
    return isLoading ? <h3>... loading</h3>
    : <section className="articles-viewer">
    <OptionsBar allArticles={allArticles} setArticlesShowing={setArticlesShowing}/>
    <ul>
        {articlesShowing.map(article => {
            const background = {"backgroundColor": `${colourChooser(article.article_id)}`}
            return (
                <li className="article-card" style={background} key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                        <h2 className="card-title">{article.title}</h2>
                        <p className="card-body">{article.body.slice(0, 80)} ...</p>
                    </Link>
                </li>
            )
        })}
    </ul>
    </section>
}