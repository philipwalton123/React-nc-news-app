import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import getArticlesByTopic from "../utils/getArticlesByTopic";

export default function OptionsBar({setArticlesShowing}) {
    console.log('hello')
    const [topics, setTopics] = useState([])

    useEffect(() => {axios.get('https://nc-news-phil-w.herokuapp.com/api/topics')
    .then(({data: {topics}}) => {
        setTopics(topics)
    })}, [])
    
    return <section className="options-bar">
        <select onChange={(event) => {getArticlesByTopic(event).then((articles) => {setArticlesShowing(articles)})}} name="sort_by" className="sort-by-menu sort-by-menu--animated">
            <option value="">All Articles</option>
            {topics.map(topic => {
                return <option value={topic.slug}>{topic.slug}</option>
            })}
        </select>
    </section>
}