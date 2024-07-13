const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch quiz questions
app.get('/api/questions', async (req, res) => {
    const amount = req.query.amount || 10;
    const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    try {
        const response = await axios.get(url);
        res.json(response.data.results);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send('Error fetching questions');
    }
});

// Serve HTML pages for each route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

app.listen(port, () => {
    console.log(`Quiz app listening at http://localhost:${port}`);
});
