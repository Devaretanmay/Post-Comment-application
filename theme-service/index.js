const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const validThemes = ['light', 'dark', 'highContrast', 'solarizedLight', 'solarizedDark', 'monokai', 'dracula'];
let currentTheme = 'light';

app.get('/theme', (req, res) => {
  res.json({ theme: currentTheme });
});

app.post('/theme', (req, res) => {
  const { theme } = req.body;
  if (validThemes.includes(theme)) {
    currentTheme = theme;
    res.json({ theme: currentTheme });
  } else {
    res.status(400).json({ error: 'Invalid theme' });
  }
});

const port = 4002;
app.listen(port, () => {
  console.log(`Theme service listening on port ${port}`);
});