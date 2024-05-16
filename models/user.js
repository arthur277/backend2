const { DataTypes, Model } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const axios = require('axios'); // for making HTTP requests to Backend B


class User extends Model { }
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users'
    }
);

User.addHook("beforeSave", async (user, options) => {
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Define a method to fetch cards for a user from Backend B
User.prototype.getCards = async function () {
    try {
        const response = await axios.get(`${process.env.BackendB_URL}/cards/${this.id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching cards from Backend B');
    }
};

module.exports = User;
