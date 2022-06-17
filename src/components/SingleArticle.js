import { useParams} from "react-router-dom"
import { useState, useEffect } from 'react'
import Header from "./Header"
import NavBar from "./NavBar"
import ArticleSection from "./ArticleSection"
import { getArticleById, getCommentsByArticleId, postCommentOnArticle } from "../api-calls/apiCalls"
import CommentsSection from "./CommentsSection"
import ErrorPage from "./ErrorPage"

export default function SingleArticle() {
    const splat = useParams()['*']
    const [thisArticle, setThisArticle] = useState({})
    const [notFound, setNotFound] = useState(false)

    useEffect(()=> {
        getArticleById(splat)
        .then(({data:{article}}) => {
            setThisArticle(article)
        })
        .then(()=> {
            
        })
    }, [splat, postCommentOnArticle])

    if (Object.keys(thisArticle).length === 0){
        return <ErrorPage/>
    } else

    return <>
    <Header />
    <NavBar />
    <ArticleSection article={thisArticle} />
    <CommentsSection splat={splat} article_id={thisArticle.article_id}/>
    </>
}