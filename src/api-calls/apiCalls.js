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
        return article
    })
}

async function decrementVotes(article_id) {
    return axios.patch(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}`, {inc_votes: -1})
    .then(({data: {article}}) => {
        return article
    })
}

async function getAllUsers() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/users')
    .then(({data: {users}}) => users)
}

async function getAllVotes() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/votes')
    .then(response => {
        return response.data
    })
}

async function postUsersVoteOnArticle(article, voter) {
    return axios.post('https://nc-news-phil-w.herokuapp.com/api/votes', {article: article, voter: voter})
    .then(response => {
    })
}

async function deleteUsersVoteOnArticle(article, voter) {
    return axios.delete('https://nc-news-phil-w.herokuapp.com/api/votes', {data: {article: article, voter: voter}})
    .then(response => {
    })
}

export {
    getAllArticles, 
    getAllTopics, 
    getArticleById, 
    getArticlesByTopic, 
    incrementVotes, 
    getAllUsers, 
    getAllVotes, 
    postUsersVoteOnArticle,
    decrementVotes,
    deleteUsersVoteOnArticle
}