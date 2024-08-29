const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');  // Make sure to import cors

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Use cors middleware

// In-memory storage for comments
const commentsByPostId = {};

// GET route to retrieve comments for a specific post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// POST route to add a new comment to a specific post
app.post('/posts/:id/comments', (req, res) => {
    // Generate a random ID for the new comment
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get existing comments or create an empty array
    const comments = commentsByPostId[req.params.id] || [];
    // Add the new comment
    comments.push({ id: commentId, content });
    // Update the comments for the post
    commentsByPostId[req.params.id] = comments;

    // Send the updated comments array with 201 status
    res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
    console.log('Server is running on port 4001');
});

