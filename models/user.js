const Sequelize = require("sequelize");

// User 모델(Sequelize.Model을 확장한 클래스) 만들고 모듈로 exports
module.exports = class User extends (
  Sequelize.Model
) {
  // 테이블에 대한 설정
  static init(sequelize) {
    // super.init
    // - 1번째 인수 :
    //   = 테이블 컬럼에 대한 설정
    //   = 시퀄라이즈는 알아서 id를 기본 키로 연결하므로 id 컬럼은 적어줄 필요 없음
    //   = MySQL 테이블과 컬럼 내용 일치해야 정확하게 대응됨
    //     ㅇ 자료형은 조금 다름
    // - 2번째 인수 : 테이블 자체에 대한 설정(옵션)
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize, // static init 메서드의 매개변수와 연결되는 옵션, db.sequelize 넣어야 함, 나중에 models/init.js에서 연결
        timestamp: false, // 자동 생성/수정 날짜 컬럼 추가/관리 기능, true면 시퀄라이즈는 createdAt과 updatedAt 컬럼 추가, 각 로우가 생성/수정될 때 시간이 자동으로 입력됨
        underscored: false, // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 캐멀 케이스(createdAt)로 만듬, true면 스네이크 케이스(created_at)로 변경
        modelName: "User", // 모델 이름 설정, 노트 프로젝트에서 사용
        tableName: "users", // 실제 DB 테이블의 이름, 일반적으로 modelName의 소문자/복수형으로 만듬
        paranoid: false, // true면 deletedAt이라는 컬럼 생성, 로우 삭제 시 완전히 지워지지 않고 deletedAt에 지원 시간 기록 -> 로우 조회 시, deletedAt 값이 null인 로우를 조회, 로우 복원 가능
        charset: "utf8", // 한글 입력 위함, 이모티콘 입력 가능하려면 utf8mb4로 변경
        collate: "utf8_general_ci", // 한글 입력 위함, 이모티콘 입력 가능하려면 utf8mb4_general_ci로 변경
      }
    );
  }

  // 다른 모델과의 관계, 1:N에서 1에 해당
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
};
