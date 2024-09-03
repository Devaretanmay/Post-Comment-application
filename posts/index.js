const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const posts = {};

app.get('/posts', (req, res) => {
  console.log('GET /posts - Current posts:', posts);
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  console.log(`POST /posts - Created new post with ID: ${id}`);
  res.status(201).send(posts[id]);
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /posts/${id} - Attempting to delete post`);
  console.log('Current posts:', posts);
  if (posts[id]) {
    delete posts[id];
    console.log(`Post ${id} deleted successfully`);
    res.status(204).send();
  } else {
    console.log(`Post ${id} not found`);
    res.status(404).send({ error: 'Post not found' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Posts service listening on port ${port}`);
});