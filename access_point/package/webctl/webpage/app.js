const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/config', (req, res) => {
    fs.readFile('/usr/html/config.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading config file' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/config', (req, res) => {
    const newConfig = req.body;
    fs.writeFile('/usr/html/config.json', JSON.stringify(newConfig, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error writing config file' });
        }
        res.json({ message: 'Configuration updated successfully' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
