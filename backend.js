const express = require('express');
//const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

//let url = "https://api.ibb.gov.tr/ispark/Park"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/district', (req, res) => {
    console.log(req.body);
    res.send(
        `Received a POST request. Selected district: ${req.body.post}`,
    );
});

app.post('/carpark', (req, res) => {
    console.log(req.body);
    res.send(
        `Received a POST request. Selected Car Park: ${req.body.post}`,
    );
});

/*
app.get('/api/districts', (req, res) => {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                for (var i in body) {
                    console.log(body[i].Ilce);
                }
            }
    })
})
*/

app.listen(port, () => console.log(`Listening on port ${port}`));