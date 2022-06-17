import { useEffect, useState } from "react";
import { getAllArticles, getAllUsers } from "../api-calls/apiCalls";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Authors() {

    const [allUsers, setAllUsers] = useState([])
    const [allArticles, setAllArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [authors, setAuthors] = useState([])

    useEffect(()=> {
        getAllUsers()
        .then(users => {
            console.log('>>>users', users)
            setAllUsers(users)
        })
        .then(()=> {
            getAllArticles()
            .then(articles => {
                console.log('>>> All Articles', articles)
                setAllArticles(articles)
                setIsLoading(false)
            })
        })
    }, [])

    allUsers.forEach(user => {
        if (allArticles.some(article => {
            return article.author === user.username
        }) && !authors.some(author => author.username === user.username)) {
            setAuthors(currentAuthors => [...currentAuthors, user])
        }
    })

    console.log("Published Authors >>>", authors)

   return <>
        <Header />
        <NavBar />
        <section className="authors-wrapper">
        <h1>Published Authors</h1>
        <section className="authors-list">
        {
            authors.map(author => {
                if (author.username !== 'guest') {
                    return (
                        <section className="author-card">
                            <img className="author-pic" src={author.avatar_url}></img>
                            <h1 className="author-name">{author.username}</h1>
                        </section>
                    )
                }
            })
        }
        </section>
        </section>
        </>
}