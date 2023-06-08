const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src"));

// 메인화면
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/src/HTML/main.html");
});


// 로그인 창
app.get("/signin", function (req, res) {
  res.sendFile(__dirname + "/src/HTML/signin.html");
});

app.post("/signin", function (req, res) {
  const id = req.body.id;
  const password = req.body.password;

  let users = [];
  try {
    const data = fs.readFileSync("userinfo.json");
    users = JSON.parse(data.toString());
    if (users.find(users => users.uid === id && users.pw === password)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(`<script>alert('${id} is succeed')</script>`);
      res.end("<script>window.location='/'</script>");
    }
    else {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(`<script>alert('${id} is failed')</script>`);
      res.end("<script>window.location='/signin'</script>");
    }
  } catch (err) {
    console.error(err);
    return;
  }
});

// 회원가입 창
app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/src/HTML/signup.html");
});

// 회원가입
app.post('/signup', async (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const password = req.body.password;

  let users = [];
  try {
    const data = fs.readFileSync("userinfo.json"); // json파일 불러오기
    if (data.length !== 0) { // 안에 데이터가 있다면 users에 저장하기
      users = JSON.parse(data.toString());
      if (users.find(users => users.uid === id)) { // id 중복확인
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write(`<script>alert('${id} already exists')</script>`);
        res.end("<script>window.location='/signup'</script>");
        return;
      }
      else {
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
      }
    }
   } catch (err) {
      console.error(err);
      return;
    }
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