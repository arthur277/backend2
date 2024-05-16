const User = require('../models/user');
const { Op, where } = require('sequelize');



async function registerUser(req, res) {
    try {
        let { username, email, password } = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        })
        if (user) {
            return res.status(409).json({ message: "user_with_creadentials_exists" })
        }
        await User.create({
            ...req.body
        });
        return res.status(201).json({ message: "user_created_successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error_in_creating_user", error })
    }
}


async function getAllUsers(req, res) {
    try {
        return res.status(201).json(await User.findAll());
    } catch (error) {
        return res.status(500).json({ message: "error_in_ftching_users", error })
    }
}

async function getUserByEmail(email) {
    return await User.findOne({
        where: { email: email }
    })
}



async function getUserCards(req, res) {
    const userId = req.params.userId;

    try {
        // Find user by userId
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Call getCards method to fetch user's cards
        const cards = await user.getCards();
        
        return res.status(200).json(cards);
    } catch (error) {
        console.error("Error in getUserCards:", error);
        return res.status(500).json({ message: "Error in retrieving user's cards" });
    }
}






module.exports = ({ registerUser, getAllUsers, getUserByEmail,getUserCards })