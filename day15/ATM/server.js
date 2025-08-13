const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory (__dirname)
app.use(express.static(__dirname));

// API Routes
app.get('/api/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading users file.');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/users', (req, res) => {
    const usersData = req.body;
    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving users file.');
        }
        res.status(200).send('Users data saved successfully.');
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
