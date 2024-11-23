const http = require('http');
const mysql = require('mysql');

const port = 3306;

// MySQL 연결
const connection = mysql.createConnection({
  host: 'localhost',    // MySQL 서버 주소 (Docker에서는 컨테이너 이름 또는 IP)
  user: 'root',         // MySQL 사용자명
  password: '1234', // MySQL 비밀번호
  database: 'opentutorials' // 데이터베이스 이름
});

// MySQL 연결 확인
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 성공');
});

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    // MySQL에서 데이터 가져오기
    connection.query('SELECT * FROM freeboard', (err, results) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('데이터 조회 실패');
        return;
      }
      
      // 결과를 JSON 형태로 클라이언트에 응답
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  } else {
    // 다른 요청은 404 응답
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('잘못된 요청');
  }
});

// 서버 실행
server.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
