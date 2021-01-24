const Sequelize = require("sequelize");

module.exports = class Comment extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        comment: { type: Sequelize.STRING(100), allowNull: false },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamp: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // 다른 테이블과의 관계 설정, 1:N의 N에 해당함
  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  }
};
