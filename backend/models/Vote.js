import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('Vote', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voteType: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        indexes: [
            {
                unique: true,
                fields: ['userId', 'postId']
            }
        ]
    })
}