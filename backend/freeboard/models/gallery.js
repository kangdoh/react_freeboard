const Sequelize = require('sequelize');

class Gallery extends Sequelize.Model{
    static initiate(sequelize){
        Gallery.init({
            fileName:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            filePath:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: true,
            tableName: 'gallerys',
            modelName: 'Gallery',
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        })
    }
    static associate(db){
        db.Gallery.belongsTo(db.Freeboard, {foreignKey: 'fileNumber', targetKey: 'id'})
    }
}

module.exports = Gallery