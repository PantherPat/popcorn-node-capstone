const {YT_key, CLIENT_ORIGIN} = require('./config');

const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

const port = process.env.PORT || 3000;

const {User} = require("./models/users");

app.use(cors({
    origin: CLIENT_ORIGIN
}));

// send back time to sync up viewers

app.get('/videos', (req, res) => {
    const filter = 'items(id,snippet/title),nextPageToken,pageInfo';
    const term = 'surfing';
    request('https://www.googleapis.com/youtube/v3/search', {
        json: true,
        qs: {
            part: 'snippet',
            q: `${term}`,
            key: `${YT_key}`,
            fields: `${filter}`
        }
    }, function (err, response, body) {
        if (!err) {
            res.json({response});
        } else {
            console.log(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}!`);
});

exports.app = app;
