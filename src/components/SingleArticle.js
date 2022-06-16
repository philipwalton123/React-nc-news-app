import { useParams} from "react-router-dom"
import { useState, useEffect } from 'react'
import Header from "./Header"
import NavBar from "./NavBar"
import ArticleSection from "./ArticleSection"
import { getArticleById, getCommentsByArticleId } from "../api-calls/apiCalls"
import CommentsSection from "./CommentsSection"

export default function SingleArticle() {
    const splat = useParams()['*']

    const [thisArticle, setThisArticle] = useState({})
    const [theseComments, setTheseComments] = useState([])

    useEffect(()=> {
        getArticleById(splat)
        .then(({data:{article}}) => {
            setThisArticle(article)
        })
        .then(()=> {
            getCommentsByArticleId(splat)
            .then(({data:{comments}})=> {
                setTheseComments(comments)
            })
        })
    }, [splat])

    console.log(theseComments)

    return <>
    <Header />
    <NavBar />
    <ArticleSection article={thisArticle} />
    <CommentsSection comments={theseComments}/>
    </>
}