// migrations은 DB의 테이블을 조정하는 것이라면,
// 이곳이 실질적으로 프론트로 값이 오고가는것을 정의해주는 곳이라고 생각하면 된다.
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm");
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'Boards',
      timestamps: true, // createdAt, updatedAt 자동 생성 비활성화
    });
    return Board;
  };