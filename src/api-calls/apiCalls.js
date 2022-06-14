import axios from 'axios'

async function getAllArticles() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/articles')
}
async function getAllTopics() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/topics')
}

async function getArticleById(article_id) {
    return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}`)
}

async function getArticlesByTopic(topic) {
    return axios
    .get(`https://nc-news-phil-w.herokuapp.com/api/articles?topic=${topic}`)
    .then(({data:{articles}}) => articles)
}

async function incrementVotes(article_id) {
    return axios.patch(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}`, {inc_votes: 1})
    .then(({data: {article}}) => {
        console.log('patch request returning', article)
        return article
    })
}

export {getAllArticles, getAllTopics, getArticleById, getArticlesByTopic, incrementVotes}