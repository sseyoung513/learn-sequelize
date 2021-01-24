// Sequelize는 시퀄라이즈 패키지이자 생성자
const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

// config/config.json에서 DB 설정 불러와 MySQL 연격 객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 연결 객체 재사용위해 db.sequelize에 저장
db.sequelize = sequelize;

// db라는 객체에 User, Comment 모델 담음
// -> db 객체를 require하여 User와 Comment 모델에 접근 가능
db.User = User;
db.Comment = Comment;
// 각각의 모델의 static init 메서드 호출 -> 테이블이 모델로 연결됨
User.init(sequelize);
Comment.init(sequelize);

// 다른 테이블과의 관계 연결
User.associate(db);
Comment.associate(db);

module.exports = db;
