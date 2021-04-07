const Express = require('express');
const app = Express();
const PORT = 8000;

app.get('/api', (req, res) => {
    console.log('This is the API')
})

app.listen(PORT, () => {
    console.log('Now Listening on Port: ' + PORT)
})
