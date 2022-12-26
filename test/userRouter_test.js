const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
const server = require("../app");

const API = "http://localhost:8080";
chai.use(chaiHttp);

describe("post login user check signup", () => {
  it("create a new user", () => {
    chai
      .request(API)
      .post("/adduserdata")
      .send({
        name: "praveen",
        email: "pra665650@gmail.com",
        password: "123456",
        phone: "9874589623",
      })
      .end((err, res) => {
        res.shound.have.status(200);
        res.body.should.have.a("object");
        res.body.should.have.a("user");
      });
  });
});

describe("post login user signin", () => {
  it("login the existing user", () => {
    chai
      .request(API)
      .post("/postloginuser")
      .send({
        email: "prawin10@outlook.com",
        password: "123456",
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status("200");
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have.property("success");
        res.body.message.should.contain(
          "you have logged in successfully please wait until it redirects"
        );
      });
  });
});

describe("get user details by passing the email", () => {
  it("check user present in or not", () => {
    chai
      .request(API)
      .get("/getuser/prawin10@outlook.com")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have.property("user");
        res.body.message.should.contain("user found please wait until loads");
        done();
      });
  });
});
