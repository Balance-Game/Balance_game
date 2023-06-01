const express = require("express");
const app = express();
const port = 8080;

app.get('/', function(req, res) {
  app.use(express.static("src/CSS"));
  let html = `
    <!doctype html>
    <html>
      <head>
          <title>Balance Blitz</title>
          <script src="https://use.fontawesome.com/releases/v6.4.0/js/all.js"></script>
          <link rel="stylesheet" href="style.css">
          <script src="a.js"></script>
      </head>
      <body>
            <div id="header">
              <h1>Balance Blitz</h1></a>
              <div id="signup"><a href ="signup"><b>회원가입</b></a></div>
              <div id="signin"><a href ="login"><b>로그인</b></a></div>
              </div>
              <div id="create">
            <a href="createQ"><div id="createQ">질문 생성</div></a>
            </div>
      </body>
    </html>
      `;
  ;
  res.send(html);
});

app.listen(port, () => {
  console.log(`localhost:${port}`);
});