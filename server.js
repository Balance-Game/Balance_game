const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const { stringify } = require("querystring");
const app = express();
const compression = require('compression');
const { get } = require("http");
const port = 8000;

app.use(express.static("src"));

// 메인화면
app.get('/', function (req, res) {
  let html = `
  <!doctype html>
  <html>
    <head>
        <title>Balance Blitz</title>
        <link rel="stylesheet" href="CSS/style.css">
        <link rel="shortcut icon" href="IMG/vs.png">
    </head>
    <body>
          <div id="header">
            <h1>Balance Blitz</h1>
            <a href="signin"><input type="button" class="signin" value="로그인"></a>
            <a href="signup"><input type="button" class="signup" value="회원가입"></a>
          </div>

            <a href="createQ">
            <div id="createQ">
            <input type="button" id="createBtn" value="질문 생성">
            </div>
            </a>
    </body>
  </html>
      `;
  res.send(html);
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

app.post("/signup_process", function (req, res) {
  
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