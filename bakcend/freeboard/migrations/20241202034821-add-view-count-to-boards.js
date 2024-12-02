'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // 테이블에 viewCount 컬럼을 추가
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Boards', 'viewCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // 기본값을 0으로 설정
    });
  },

  // viewCount 컬럼을 삭제하는 롤백 작업
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Boards', 'viewCount');
  }
  
};
