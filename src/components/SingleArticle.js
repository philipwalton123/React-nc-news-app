import { useParams} from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from "./Header"
import NavBar from "./NavBar"
import ArticleSection from "./ArticleSection"

export default function SingleArticle() {
    const splat = useParams()['*']

    const [thisArticle, setThisArticle] = useState({})
    const [isLoading, setIsloading] = useState(true)

    useEffect(()=> {
        axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${splat}`)
        .then(({data:{article}}) => {
            setThisArticle(article)
        })
    }, [])

    return <>
    <Header />
    <NavBar />
    <ArticleSection article={thisArticle} />
    </>
}