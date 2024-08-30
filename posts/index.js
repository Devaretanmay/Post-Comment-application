// @ts-nocheck
const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const posts = {};
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    return res.send(posts);
});



 app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});