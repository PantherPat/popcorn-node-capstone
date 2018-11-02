// const { YT_key } = require('../config');
// const { app, runServer, closeServer } = require("../server");

// // add testDB later
// const chai = require("chai");
// const chaiHTTP = require("chai-http");
// const expect = chai.expect;

// chai.use(chaiHTTP);

// describe("API", function() {
// // GET
//  it("should send back search results", function() {
//     const term = "eighties";
//     return chai
//     .request(app)
//     .get(`/videos`)
//     .query({ part: 'snippet', q: term, key: YT_key, maxResults: 2 })
//     .then(function(res) {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
//   });

//   it("should get all videos and status code 200", function() {
//     return chai
//     .request(app)
//     .get(`/videos`)
//     .then(function(res) {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
//   });

// //POST
// //   it("should post a video and status code 201", function() {
// //     const videoID = '1234';
// //     const title = 'Test title';
// //     const thumbnail = 'test.png';
// //     const user = 'Test Person1';

// //     return chai
// //     .request(app)
// //     .post(`/videos`)
// //     .send({
// //         videoID, title, thumbnail, user
// //     })
// //     .then(function(res) {
// //         expect(res).to.have.status(201);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an('object');
// //         expect(res.body).to.include.all.keys('videoID', 'title', 'thumbnail', 'user');
// //       });
// //   });

//   //PUT
//   it("should get all videos and status code 201", function() {
//     const time = '120';
//     return chai
//     .request(app)
//     .put(`/videos/34567/${time}`)
//     .send({
//         time
//     })
//     .then(function(res) {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.include.all.keys('time');
//       });
//   });

// //DELETE
// it("should delete video and have status code 204", function() {
//     const id = '34567';
//     return chai
//     .request(app)
//     .delete(`/videos/34567`)
//     .then(function(res) {
//         expect(res).to.have.status(204);
//       });
//   });

// });
