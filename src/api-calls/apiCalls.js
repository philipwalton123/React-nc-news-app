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

async function getUserByUsername(username) {
    return axios.get(`https://nc-news-phil-w.herokuapp.com/api/users/${username}`)
}

async function getCommentsByArticleId(article_id, limit, page) {
    console.log(limit, '<<<limit')
    console.log(page, '<<<<<page')
    if(!limit && !page) {
        return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}/comments`)
    } else if (limit | page) {
        let query = '?'
        if (limit) query+= `limit=${limit}`
        if (limit && page) query += `&p=${page}`
        if (page & !limit) query += `p=$page`

        console.log(query, '<<< query')

        return axios.get(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}/comments${query}`)
    }
    
}

async function postCommentOnArticle(article_id, commenter, comment) {
    console.log('article_id', article_id)
    console.log('commenter', commenter)
    console.log('comment', comment)

    
        return axios.post(`https://nc-news-phil-w.herokuapp.com/api/articles/${article_id}/comments`, {username: commenter, body: comment})
        .then(response => {
        console.log(response)
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
    deleteUsersVoteOnArticle,
    getUserByUsername,
    getCommentsByArticleId,
    postCommentOnArticle
}