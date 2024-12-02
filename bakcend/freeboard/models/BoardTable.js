'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 여기서 테이블끼리의 관계를 설정한다. (Foreign Key와 같은)
    }
  }
  Boards.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Boards',
  });
  return Boards;
  
};