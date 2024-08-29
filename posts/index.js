const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for posts
const posts = {};

// GET route to retrieve all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// POST route to create a new post
app.post('/posts', (req, res) => {
    // Generate a random ID for the new post
    const id = randomBytes(4).toString('hex');
    // Extract the title from the request body
    const { title } = req.body;
    
    // Create a new post object and store it
    posts[id] = { id, title };
    
    // Send the created post with 201 (Created) status
    res.status(201).send(posts[id]);
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
