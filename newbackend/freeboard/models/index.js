const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user')
const Comment = require('./comment')
const Freeboard = require('./freeboard')


const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User; // db 객체에 추가
db.Comment = Comment;
db.Freeboard = Freeboard;


User.initiate(sequelize); // 모델의 테이블 구조를 초기화
Comment.initiate(sequelize);
Freeboard.initiate(sequelize);


User.associate(db); // 모델 간의 관계를 정의
Comment.associate(db);
Freeboard.associate(db);

module.exports = db;
