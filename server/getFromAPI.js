const axios = require('axios');

const getFromAPI = async (query) =>{
    if(!query){
        const result = await axios.get('https://test.spaceflightnewsapi.net/api/v2/articles')
        return result;
    }else{

    }
}

module.exports = getFromAPI;