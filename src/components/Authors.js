import { useContext, useEffect, useState } from "react";
import { getAllArticles, getAllUsers } from "../api-calls/apiCalls";
import { LocationContext } from "../contexts/Location";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Authors() {

    const [allUsers, setAllUsers] = useState([])
    const [allArticles, setAllArticles] = useState([])
    const [, setIsLoading] = useState(true)
    const [authors, setAuthors] = useState([])
    const {setLocation} = useContext(LocationContext)

    useEffect(()=> {
        setLocation('authors')
        getAllUsers()
        .then(users => {
            setAllUsers(users)
        })
        .then(()=> {
            getAllArticles()
            .then(articles => {
                setAllArticles(articles)
                setIsLoading(false)
            })
        })
    }, [setLocation])

    allUsers.forEach(user => {
        if (allArticles.some(article => {
            return article.author === user.username
        }) && !authors.some(author => author.username === user.username)) {
            setAuthors(currentAuthors => [...currentAuthors, user])
        }
    })

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
                        <li key={author.username} className="author-card">
                            <img key={author.userName} className="author-pic" src={author.avatar_url} alt="auth"></img>
                            <h1 className="author-name">{author.username}</h1>
                        </li>
                    )
                } else return null
            })
        }
        </section>
        </section>
        </>
}