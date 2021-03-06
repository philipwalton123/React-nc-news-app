import { useState, useEffect } from "react";
import { getAllTopics, getArticlesByTopic, getArticlesByTopicSorted, getArticlesByTopicSortedPage } from "../api-calls/apiCalls";

export default function OptionsBar({allArticles, setArticlesShowing}) {
    const [topics, setTopics] = useState([])
    const [topicChoice, setTopicChoice] = useState('')
    const [orderChoice, setOrderChoice] = useState('created_at')
    const [orderFlip, setOrderFlip] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {getAllTopics()
    .then(({data: {topics}}) => {
        setTopics(topics)
    })}, [])

    function handleTopicChoose(event) {
        getArticlesByTopic(event.target.value)
        .then((articles) => {
            setArticlesShowing(articles)
            setTopicChoice(event.target.value)
        }
    )}
    

    function handleSort(event) {
        setOrderChoice(event.target.value)
        event.target.value === 'author' || event.target.value === 'title' ? setOrderFlip(true) : setOrderFlip(false)
        getArticlesByTopicSorted(topicChoice, event.target.value, event.target.value === 'created_at' ? orderFlip : !orderFlip)
        .then((articles) => {
            setArticlesShowing(articles)
        })
    }

    function handleFlip() {

        getArticlesByTopicSorted(topicChoice, orderChoice, orderFlip)
        .then((articles) => {
            setArticlesShowing(articles)
        })
        setOrderFlip(current => !current)
    }

    function handleNext() {
        getArticlesByTopicSortedPage(topicChoice, orderChoice, orderFlip, page + 1)
        .then((articles) => {
            if (articles.length !== 0) {
                setArticlesShowing(articles)
                setPage((currentPage) => currentPage + 1) 
            }
        })
    }

    function handlePrevious() {
        getArticlesByTopicSortedPage(topicChoice, orderChoice, orderFlip, page - 1)
        .then((articles) => {
            if (articles.length !== 0) {
                setArticlesShowing(articles)
                setPage((currentPage) => currentPage - 1) 
            }
        })
    }
    
    return <section className="options-bar">
            <select id='category-chooser' onChange={handleTopicChoose} name="sort_by" className="sort-by-menu sort-by-menu--animated">
                <option value="">All Articles</option>
                {topics.filter(topic => {
                    return allArticles.some(article=> article.topic === topic.slug)
                }).map(topic => {
                    return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                })}
            </select>
            <select id='article-sorter' onChange={handleSort} className='sort-by-menu'>
                <option value='created_at'>Sort by date</option>
                <option value='comment_count'>Sort by comments</option>
                <option value='votes'>Sort by votes</option>
                <option value='author'>Sort by author</option>
                <option value='title'>Sort by title</option>
            </select>
            <button className='action-button' id="flip-button" value={orderFlip} onClick={handleFlip}>{orderFlip? 'DESC' : 'ASC'}</button>
            {page !== 1 ? 
            <button className='action-button' id="flip-button" value={orderFlip} onClick={handlePrevious}>Previous</button> 
            : null }
            <button className='action-button' id="flip-button" value={orderFlip} onClick={handleNext}>Next</button>
    </section>
}