const Sequelize = require('sequelize');

class Freeboard extends Sequelize.Model{
    static initiate(sequelize){
        Freeboard.init({
            title:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },  
            content:{
                type: Sequelize.TEXT,
                allowNull: false,
            },
            // createAt:{
            //     type: Sequelize.DATE,
            //     defaultValue: Sequelize.NOW,
            //     allowNull: false,
            // },
            // updateAt:{
            //     type: Sequelize.DATE,
            //     defaultValue: Sequelize.NOW,
            //     allowNull: false,
            // },
            viewCount:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        },{
            sequelize,
            timestamps: true,
            tableName: "freeboards",
            modelName: "Freeboard",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        })
    }
    static associate(db){  
        db.Freeboard.hasMany(db.Gallery, {foreignKey: 'fileNumber', sourceKey: 'id'})
    }
}

module.exports = Freeboard;