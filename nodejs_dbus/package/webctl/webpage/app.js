const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
var DBus = require('dbus');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

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

var bus = DBus.getBus('system');
const serviceName = "com.embedlinux.messenger";
const objectPath = "/com/embedlinux/messenger";
const interfaceName = "com.embedlinux.web";

app.post('/api/calculate', (req, res) => {
    const value1 = req.body.value1;
    const value2 = req.body.value2;

    bus.getInterface(serviceName, objectPath, interfaceName, (err, iface) => {
        if (err) {
            return res.status(500).send({ error: "Error getting interface:", err });
        }
    
        if (!iface.add_numbers) {
            return res.status(500).send({ error: "Method add_numbers not found on interface:", err });
        }
    
        iface.add_numbers(value1, value2, (err, result) => {
        if (err) {
          return res.status(500).send({ error: "Error calling method:", err });
        }
    
        console.log("Result from server:", result);
        res.send({ result });
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
