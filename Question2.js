const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;


app.use(express.json());
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({ extname: '.hbs', }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



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

app.get('/viewdata', (req, res) => {
    fs.readFile('country.json', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.render('viewdata', {
                countries: jsonData.country,
                layout: false
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
