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
app.get('/', function (req, res) {
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
app.post('/', async (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const password = req.body.password;

  let users = [];
  try {
    const data = fs.readFileSync("userinfo.json"); // json파일 불러오기
    if (data.length !== 0) { // 안에 데이터가 있다면 users에 저장하기
      for (let i = 0; i < users.length; i++) {
        if (users[i].uid == id) {
          res.send('중복된 ID입니다.');
        }

        users = JSON.parse(data.toString());
      }
    }
   } catch (err) {
      console.error(err);
      return;
    }
  

    const user = {
      uname: name,
      uid: id,
      pw: password,
    };

    // users에 추가히기
    users.push(user);

    // json에 users넣기
    const userJSON = JSON.stringify(users);
    fs.writeFileSync("userinfo.json", userJSON);
    res.redirect('/');
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