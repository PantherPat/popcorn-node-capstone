const {YT_key} = require('../config');

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
    const id = 'rj7xMBxd5iY';
    const thumbnail = "image.png";
    const desc = "lorem ipsum";

    console.log('getting all videos!');
    // send back watchlist and generate with thumbnail and id
    res.json({id, thumbnail, desc});
});

router.get('/:term', (req, res) => {
    const filter = 'items(id,snippet/title,snippet/thumbnails),nextPageToken,pageInfo';
    const term = req.params.term;
    console.log(term);
    request('https://www.googleapis.com/youtube/v3/search', {
        json: true,
        qs: {
            part: 'snippet',
            q: term,
            key: YT_key,
            fields: filter,
            maxResults: 25
        }
    }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log('searching for videos!');
            res.json({response});
        } else {
            console.log(err);
            res.status(400).json(err);
        }
    });
});

// Add video to watchlist collection
router.post('/:id', (req, res) => {
    const id = req.params.id;
    const thumbnail = "image.png";
    const desc = "lorem ipsum";

    console.log('adding video!');
    res.status(201).json({id, thumbnail, desc});
});

// send back time to sync up viewers and store in user data?
router.put('/:id/:time', (req, res) => {
    const id = req.params.id;
    const time = req.params.time;
    console.log('updating video!');
    res.status(201).json({time});
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    console.log('deleting video!');
    res.status(204).end();
});

module.exports = router;

