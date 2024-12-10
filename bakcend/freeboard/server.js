require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const boardRoutes = require('./routes/boardRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // React 앱 출처
//   methods: ['GET', 'POST'],        // 허용할 HTTP 메서드
//   cnpmredentials: true                // 쿠키 허용 여부
// }));

app.use(bodyParser.json());
app.use('/boards', boardRoutes);

// db 연결하고 model안에 있는 table 생성하는 함수
db.sequelize.sync({force:false})
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Board API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
