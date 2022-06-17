import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getLatestArticle } from "../api-calls/apiCalls"

export default function TopArticle() {

    const [latestArticle, setLatestArticle] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [screenWidth, setScreenWidth] = useState(Window.innerwidth)

    useEffect(()=>{
        getLatestArticle()
        .then(({data:{articles}}) => {
            setLatestArticle(articles[0])
            setIsLoading(false)
        })
        .then(()=>{
            window.addEventListener('resize', (event)=> {
                console.log(event.target.innerWidth)
                setScreenWidth(event.target.innerWidth)
            })
        })
    },[])

    const articleLink = `/articles/${latestArticle.article_id}`

    return <section className="top-article">
        { isLoading ? <p>...loading</p> :
        <>
        <Link to={articleLink}>
            <h2>Latest Article</h2>
            <h2>{latestArticle.title}</h2>
        </Link>
            {
                window.innerWidth < 600 ? null 
                : <p>{latestArticle.body} ...</p>
            }
        </>
        }
    </section>
}