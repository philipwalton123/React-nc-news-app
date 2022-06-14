import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import colourChooser from '../utils/colour-chooser'
import OptionsBar from './OptionsBar'

export default function Articles() {
    
    const [articlesShowing, setArticlesShowing] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState("")

    useEffect(()=> {
        axios.get('https://nc-news-phil-w.herokuapp.com/api/articles')
        .then(({data: {articles}}) => {
            setArticlesShowing(articles)
            setIsLoading(false)
        })
    }, [query])

    return isLoading ? <h3>... loading</h3>
    : <>
    <OptionsBar articlesShowing={articlesShowing} setArticlesShowing={setArticlesShowing}/>
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
    </>
}