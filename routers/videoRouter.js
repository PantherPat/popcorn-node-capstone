const { YT_key } = require("../config");
const { Videos } = require("../models/videos");
var ObjectId = require('mongodb').ObjectID;

const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", (req, res) => {
  const id = "rj7xMBxd5iY";
  const thumbnail = "image.png";
  const desc = "lorem ipsum";

  console.log("getting all videos!");
  // send back watchlist and generate with thumbnail and id
  res.json({id,thumbnail,desc});
});

router.get("/:term", (req, res) => {
  const filter = "items(id,snippet/title,snippet/thumbnails),nextPageToken,pageInfo";
  const term = req.params.term;
  console.log(term);
  request(
    "https://www.googleapis.com/youtube/v3/search",
    {
      json: true,
      qs: {
        part: "snippet",
        q: term,
        key: YT_key,
        fields: filter,
        maxResults: 25,
        type: "video"
      }
    },
    function(err, response, body) {
      if (!err && response.statusCode === 200) {
        console.log("searching for videos!");
        return res.json({ response });
      } else {
        console.log(err);
        res.status(400).json(err);
      }
    }
  );
});

// Add video to watchlist collection
router.post("/", (req, res) => {

  const videoObj = {
    videoID: req.body.video.id,
    title: req.body.video.title,
    thumbnail: req.body.video.thumbnail,
    user: req.body.id
  };

  Videos.find({user: ObjectId(videoObj.user), videoID: videoObj.videoID})
    .count()
    .then(count => {
      if (count === 0) {
        Videos.create(videoObj)
          .then(video => {
            res.json(video);
          })
          .catch(err => {
            console.log("videoRouter.js", err);
          });
      }
    })
    .catch(err => {
      console.log("videoRouter.js", err);
    });
});

// send back time to sync up viewers and store in user data?
router.put("/:id/:time", (req, res) => {
  const id = req.params.id;
  const time = req.params.time;
  console.log("updating video!");
  res.status(201).json({ time });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  console.log("deleting video!");
  res.status(204).end();
});

module.exports = router;
