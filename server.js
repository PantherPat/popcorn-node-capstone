const {YT_key} = require('./config');
const express = require('express');
const request = require('request');
const app = express();

const port = process.env.PORT || 3000;

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
