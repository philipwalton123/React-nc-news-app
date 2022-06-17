import axios from 'axios'

async function getAllArticles() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/articles?limit=50')
    .then(({data:{articles}}) => articles)
}

async function get8Articles() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/articles?limit=9')
}

async function getLatestArticle() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/articles?sort_by=created_at&limit=1&order=desc')
}

async function getAllTopics() {
    return axios.get('https://nc-news-phil-w.herokuapp.com/api/topics')
}


async function getArticleById(article_id) {
    return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}`)
}

async function getArticlesByTopic(topic) {
    return axios
    .get(`https://nc-news-phil-w.herokuapp.com/api/articles?limit=9&topic=${topic}`)
    .then(({data:{articles}}) => articles)
}


async function getArticlesByTopicSorted(topic, sortOption, orderFlip) {
    return axios
    .get(`https://nc-news-phil-w.herokuapp.com/api/articles?limit=9&topic=${topic}&sort_by=${sortOption}&order=${orderFlip ? 'desc' : 'asc'}`)
    .then(({data:{articles}}) => articles)
}

async function getArticlesByTopicSortedPage(topic, sortOption, orderFlip, page) {
    return axios
    .get(`https://nc-news-phil-w.herokuapp.com/api/articles?limit=9&topic=${topic}&sort_by=${sortOption}&p=${page}&order=${orderFlip ? 'desc' : 'asc'}`)
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

async function getUserByUsername(username) {
    return axios.get(`https://nc-news-phil-w.herokuapp.com/api/users/${username}`)
}

async function getCommentsByArticleId(article_id, limit, page) {
 
    if(!limit && !page) {
        return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}/comments`)
    } else if (limit | page) {
        let query = '?'
        if (limit) query+= `limit=${limit}`
        if (limit && page) query += `&p=${page}`
        if (page & !limit) query += `p=$page`

        return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}/comments${query}`)
    }
}

async function postCommentOnArticle(article_id, commenter, comment) {
        return axios.post(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}/comments`, {username: commenter, body: comment})
        .then(response => {
        })
}

async function deleteCommentById(comment_id) {
    return axios.delete(`https://nc-news-phil-w.herokuapp.com/api/comments/${comment_id}`)
}

async function postNewArticle(body) {
    return axios.post(`https://nc-news-phil-w.herokuapp.com/api/articles/`, body)
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
    deleteUsersVoteOnArticle,
    getUserByUsername,
    getCommentsByArticleId,
    postCommentOnArticle,
    getArticlesByTopicSorted,
    deleteCommentById,
    get8Articles,
    getArticlesByTopicSortedPage,
    getLatestArticle,
    postNewArticle
}