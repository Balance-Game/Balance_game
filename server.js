const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const { stringify } = require("querystring");
const app = express();
const compression = require('compression');
const { get } = require("http");
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("src"));

// 메인화면
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/src/HTML/main.html");
});


// 로그인 창
app.get("/signin", function (req, res) {
  res.sendFile(__dirname + "/src/HTML/signin.html");
});

app.post("signin_process", function (req, res) {

});
// 회원가입 창
app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/src/HTML/signup.html");
});

// 회원가입
app.post('/', (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const pw = req.body.pw;
  console.log(name);
  console.log(id);
  console.log(pw);

});

// 질문 생성 창
app.get("/createQ", function (req, res) {
  res.sendFile(__dirname + "/src/HTML/createQ.html");

});

app.post("/createQ_process", function () {

});

app.listen(port, () => {
  console.log(`localhost:${port}`);
});