
module.exports = (sequelize, DataTypes) => {
    const BoardFiles = sequelize.define('BoardFiles', {
        id :{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Boards',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE,'
        },
        filePath:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileName:{  
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploadedAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },{
        tableName: 'BoardFiles',
        timestamps : true,
    });
    
    BoardFiles.associate = (models) => {
        // BoardFiles는 Board 모델을 참조하고 있음
        BoardFiles.belongsTo(models.Board, { foreignKey: 'postId', targetKey: 'id' });
    };

    return BoardFiles
}