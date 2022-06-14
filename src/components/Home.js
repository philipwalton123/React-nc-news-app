import { useState } from 'react'
import { TopicsContext } from '../contexts/Topics';
import axios from 'axios'
import Articles from "./Articles";
import Header from "./Header";
import NavBar from "./NavBar";
import TopArticle from "./TopArticle";

export default function Home() {

    const [topics, setTopics] = useState([])

    axios.get('https://nc-news-phil-w.herokuapp.com/api/topics')
    .then(({data: {topics}}) => {
        setTopics(topics)
    })


    return <div className="home-wrapper">
        <Header />
        <TopicsContext.Provider value={{topics, setTopics}}>
            <NavBar />
            <section className="viewport">
                <TopArticle />
                <Articles /> 
            </section>
        </TopicsContext.Provider>
    </div>
}