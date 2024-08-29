const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let currentTheme = 'light';

app.get('/theme', (req, res) => {
    res.json({ theme: currentTheme });
});

app.post('/theme', (req, res) => {
    const { theme } = req.body;
    if (theme === 'light' || theme === 'dark') {
        currentTheme = theme;
        res.status(200).json({ theme: currentTheme });
    } else {
        res.status(400).json({ error: 'Invalid theme' });
    }
});

const PORT = 4002;
app.listen(PORT, () => {
    console.log(`Theme service running on port ${PORT}`);
});