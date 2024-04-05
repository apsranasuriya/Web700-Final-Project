const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/alldata', (req, res) => {
    fs.readFile('country.json', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(jsonData, null, 2));
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
