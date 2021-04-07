const Express = require('express');
const cors = require('cors')
const getFromAPI = require('./getFromAPI')
const app = Express();
const PORT = 8000;

app.use(cors())

app.get('/api', async (req, res) => {
    res.status(200)
    const result = await getFromAPI();
    res.json(result.data);
})

app.listen(PORT, () => {
    console.log('Now Listening on Port: ' + PORT)
})
