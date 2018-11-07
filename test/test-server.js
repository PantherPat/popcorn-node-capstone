const { app, runServer, closeServer } = require("../server");
const { YT_key, TEST_DB_URL } = require("../config");
const { User } = require("../models/users");
const { Videos } = require("../models/videos");
var ObjectId = require("mongodb").ObjectID;

const chai = require("chai");
const chaiHTTP = require("chai-http");
const mongoose = require("mongoose");
const expect = chai.expect;

chai.use(chaiHTTP);

function genUser() {
  const user = {
    username: "boston",
    email: "boston@gmail.com",
    password: "happy"
  };

  return User.create(user).then(user => {
    return user;
  });
}

function genJWTToken() {
  let token;
  const creds = {
    email: "boston@gmail.com",
    password: "happy"
  };

  return chai
    .request(app)
    .post("/auth/login")
    .send(creds)
    .then(function(res) {
      expect(res).to.have.status(200);
      token = res.body.token;
      return token;
    });
}

function tearDownDb() {
  console.warn("Deleting database");
  return mongoose.connection.dropDatabase();
}

describe("Popcorn Test", function() {
  before(function() {
    return runServer(TEST_DB_URL);
  });

  beforeEach(function() {
    return genUser();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // ******* TESTING GET ******* //
  describe("GET videos endpoint", function() {
    it("Should get search results", function() {
      return genJWTToken().then(token => {
        return User.find({ username: "boston" }).then(user => {
          return chai
            .request(app)
            .get("/videos/search/eighties")
            .set("Authorization", `Bearer ${token}`)
            .query({
              part: "snippet",
              q: "eighties",
              key: YT_key,
              maxResults: 2
            })
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.an("object");
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    });
  });

  // ******* TESTING POST ******* //
  describe("POST videos endpoint", function() {
    it("Should post to watchlist", function() {
      return genJWTToken().then(token => {
        return User.find({ username: "boston" }).then(user => {
          const videoObj = {
            id: "M4Ufs7-FpvU",
            title: "Best Movie Soundtracks (Top 10 HD)",
            thumbnail: "https://i.ytimg.com/vi/M4Ufs7-FpvU/mqdefault.jpg"
          };

          const userVideo = { video: videoObj, id: user[0]._id };

          return chai
            .request(app)
            .post("/videos")
            .send(userVideo)
            .set("Authorization", `Bearer ${token}`)
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.an("object");
            });
        });
      });
    });
  });

  // ******* TESTING DELETE ******* //
  describe("DELETE video endpoint", function() {
    it("should delete video and have status code 204", function() {
      return genJWTToken().then(token => {
        return User.find({ username: "boston" }).then(user => {
          const videoObj = {
            id: "M4Ufs7-FpvU",
            title: "Best Movie Soundtracks (Top 10 HD)",
            thumbnail: "https://i.ytimg.com/vi/M4Ufs7-FpvU/mqdefault.jpg"
          };

          const userVideo = { video: videoObj, id: user[0]._id };

          return chai
            .request(app)
            .post("/videos")
            .send(userVideo)
            .set("Authorization", `Bearer ${token}`)
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.an("object");
              let videoID = res.body._id;
              return chai
                .request(app)
                .delete(`/videos/${videoID}`)
                .set("Authorization", `Bearer ${token}`)
                .then(function(res) {
                  expect(res).to.have.status(204);
                  Videos.find({ _id: ObjectId(videoID) }).then(video => {
                    expect(video).to.have.lengthOf(0);
                  });
                });
            });
        });
      });
    });
  });
});
