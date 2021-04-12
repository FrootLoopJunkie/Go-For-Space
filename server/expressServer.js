const express = require('express');
const cors = require('cors')
const ApiFunctions = require('./getFromAPI')
const { Pool } = require('pg')
const app = express();
const PORT = 8000;

const pool = new Pool({
    user: "Kolby",
    password: "",
    host: "localhost",
    port: "5432",
    database: "postgres"
})

app.use(cors())
app.use(express.json())

app.get('/api/articles', async (req, res) => {
    res.status(200)
    const result = await ApiFunctions.getFromAPIInitial();
    res.json(result);
})

app.get('/api/articles/:query', async (req, res) => {
    const query = req.params.query;
    console.log(query);
    const result = await ApiFunctions.handleArticleQuery(query);
    res.status(200)
    console.log(result)
    res.json(result);
})

app.post('/api/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const result = await pool.query(`SELECT * FROM users`);
        result.rows.forEach((user, index) => {
            if(user.username.toLowerCase() === username.toLowerCase() && user.password === password){
                console.log('Logged in')
                res.status(200).end('Logged In');
            }else if(index === result.rows.length -1){
                console.log('No Match')
                res.status(406).end('No Match')
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).end(err);
    }
})

app.post('/api/account', async (req, res) => {
    try {
        const {username, password} = req.body;
        const result = await pool.query(`SELECT * FROM users`);
        result.rows.forEach(async (user, index) => {
            if(user.username.toLowerCase() === username.toLowerCase()){
                console.log('Username Already Taken')
                res.status(406).end('Username Taken');
            }else if(index === result.rows.length -1){
                const insert = await pool.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`);
                console.log('User Created')
                res.status(201).end('User Created')
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).end(err);
    }
});

app.get('/api/account', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).end(err);  
    }
});

app.get('/api/account/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
        console.log(result.rows)
        if(result.rows.length !== 0){
            res.status(200).json(result.rows);
        }else{
            res.status(406).end('No Result Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).end(err);  
    }
});

app.delete('/api/account/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query(`SELECT * FROM users`);
        result.rows.forEach(async (user, index) => {
            if(user.id === id){
                console.log('User Deleted')
                const deleteQuery = await pool.query(`DELETE FROM users WHERE id = ${req.params.id}`)
                res.status(200).end('User Deleted');
            }else if(index === result.rows.length -1){
                console.log('User not Found')
                res.status(406).end('User not Found')
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).end(err); 
    }
})

app.put('/api/account/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {username, password} = req.body;
        const result = await pool.query(`SELECT * FROM users`);
        result.rows.forEach(async (user, index) => {
            if(user.id === id){
                console.log('User Updated')
                const updateQuery = await pool.query(`UPDATE users SET username = '${username}', password = '${password}' WHERE id = ${id}`)
                res.status(200).end('User Updated');
            }else if(index === result.rows.length -1){
                console.log('User not Found')
                res.status(406).end('User not Found')
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).end(err); 
    }
})

app.listen(PORT, () => {
    console.log('Now Listening on Port: ' + PORT)
})
