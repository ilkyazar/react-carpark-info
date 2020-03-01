const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const path = require('path');

let url = "https://api.ibb.gov.tr/ispark/Park"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/data', (req, res) => {
    data = [];

    request({
        url: url,
        json: true
    }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                for (var i in body) {
                    data.push(body[i])
                }
            }
        res.json(data);
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
      
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Listening on port ${port}`));