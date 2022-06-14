import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { getAllTopics, getArticlesByTopic } from "../api-calls/apiCalls";

export default function OptionsBar({setArticlesShowing}) {
    console.log('hello')
    const [topics, setTopics] = useState([])

    useEffect(() => {getAllTopics()
    .then(({data: {topics}}) => {
        setTopics(topics)
    })}, [])
    
    return <section className="options-bar">
        <select onChange={(event) => {getArticlesByTopic(event.target.value).then((articles) => {setArticlesShowing(articles)})}} name="sort_by" className="sort-by-menu sort-by-menu--animated">
            <option value="">All Articles</option>
            {topics.map(topic => {
                return <option value={topic.slug}>{topic.slug}</option>
            })}
        </select>
    </section>
}