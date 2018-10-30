const { app } = require("../server");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;

chai.use(chaiHTTP);

describe("API", function() {
// GET
  it("should send back search results", function() {
    const term = "eighties";
    return chai
    .request(app)
    .get(`/videos/${term}`)
    .then(function(res) {
        console.log(`/videos/${term}`);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  it("should get all videos and status code 200", function() {
    return chai
    .request(app)
    .get(`/videos`)
    .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

//POST
  it("should get all videos and status code 201", function() {
    const id = '34567';
    const thumbnail = "image.png";
    const desc = "lorem ipsum";
    return chai
    .request(app)
    .post(`/videos/34567`)
    .send({
        id, thumbnail, desc
    })
    .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.all.keys('id','thumbnail','desc');
      });
  });

  //PUT
  it("should get all videos and status code 201", function() {
    const time = '120';
    return chai
    .request(app)
    .put(`/videos/34567/${time}`)
    .send({
        time
    })
    .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.all.keys('time');
      });
  });

//DELETE
it("should delete video and have status code 204", function() {
    const id = '34567';
    return chai
    .request(app)
    .delete(`/videos/34567`)
    .then(function(res) {
        expect(res).to.have.status(204);
      });
  });

});
