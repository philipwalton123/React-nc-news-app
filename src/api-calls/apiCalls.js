import axios from 'axios'

async function getAllArticles() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/articles')
}
async function getAllTopics() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/topics')
}

async function getArticleById(id) {
    return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${id}`)
}

async function getArticlesByTopic(topic) {
    return axios
    .get(`https://nc-news-phil-w.herokuapp.com/api/articles?topic=${topic}`)
    .then(({data:{articles}}) => articles)
}

export {getAllArticles, getAllTopics, getArticleById, getArticlesByTopic}