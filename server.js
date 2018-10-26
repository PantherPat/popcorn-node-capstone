const {YT_key, CLIENT_ORIGIN} = require('./config');

const express = require('express');
const cors = require('cors');
const request = require('request');
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

const {User} = require("./models/users");

app.use(express.json());
app.use(morgan('common'));

app.use(cors({
    origin: CLIENT_ORIGIN
}));

app.get('/videos', (req, res) => {
    const id = 'rj7xMBxd5iY';
    const thumbnail = "image.png";
    const desc = "lorem ipsum";

    console.log('getting all videos!');
    // send back watchlist and generate with thumbnail and id
    res.json({id, thumbnail, desc});
});

// send back time to sync up viewers

app.get('/videos/:term', (req, res) => {
    const filter = 'items(id,snippet/title,snippet/thumbnails),nextPageToken,pageInfo';
    const term = req.params.term;
    console.log(term);
    request('https://www.googleapis.com/youtube/v3/search', {
        json: true,
        qs: {
            part: 'snippet',
            q: term,
            key: YT_key,
            fields: filter
        }
    }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log('searching for videos!');
            res.json({response});
        } else {
            console.log(err);
            res.json(err);
        }
    });
});

// Add video to watchlist collection
app.post('/videos/:id', (req, res) => {
    const id = req.params.id;
    const thumbnail = "image.png";
    const desc = "lorem ipsum";

    console.log('adding video!');
    res.status(201).json({id, thumbnail, desc});
});

app.delete('/videos/:id', (req, res) => {
    const id = req.params.id;

    console.log('deleting video!');
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}!`);
});

exports.app = app;
