const axios = require('axios');

let storedArticles;

const getFromAPIInitial = async () =>{
    if(!storedArticles){
        const result = await axios.get('https://spaceflightnewsapi.net/api/v2/articles?_limit=10')
        storedArticles = result.data;
    }
    
    setTimeout(getFromAPILong, 1000)
    console.log('initial')
    return storedArticles;
}//
//
const getFromAPILong = async () => {
    if(Object.keys(storedArticles).length <= 10){
        const result = await axios.get('https://spaceflightnewsapi.net/api/v2/articles?_limit=1000')
        storedArticles = result.data;
    }
    console.log(Object.keys(storedArticles).length)
}

const handleArticleQuery = (query) => {
    let articlesMatchingQuery = [];
    storedArticles.forEach(article => {
        if(article.title.toLowerCase().includes(query.toLowerCase())){
            articlesMatchingQuery.push(article)
        }else if(article.summary.toLowerCase().includes(query.toLowerCase())){
            articlesMatchingQuery.push(article)
        }
    })
    console.log(articlesMatchingQuery)
    return articlesMatchingQuery;
}

const functions = {
    getFromAPIInitial,
    getFromAPILong,
    handleArticleQuery
}

module.exports = functions;