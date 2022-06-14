import axios from 'axios'

export default async function getArticlesByTopic({target:{value}}) {
    console.log(value)
    return axios
    .get(`https://nc-news-phil-w.herokuapp.com/api/articles?topic=${value}`)
    .then(({data:{articles}}) => articles)
}