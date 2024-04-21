const { DataTypes, Model } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;


class Card extends Model { }
Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        strength: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'cards'
    }
);

module.exports = Card