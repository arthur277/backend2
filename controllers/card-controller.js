const Card = require('../models/card');


async function addCard(req, res) {
    try {
        let { name, type, strength, description, userId } = req.body

        const card = await Card.findOne({
            where: {
                name: name
            }
        })
        if (card) {
            return res.status(409).json({ message: "card_exists" });
        }
        await Card.create({
            ...req.body
        });
        return res.status(201).json({ message: "card_created" });
    } catch (error) {
        return res.status(500).json({ message: "error_in_creating_card", error })

    }
}

async function getAllCards(req, res) {
    try {
        const cards = await Card.findAll();
        return res.status(200).json(cards)
    } catch (error) {
        return res.status(500).json({ message: "error in retreiving cards" });
    }
}



module.exports = ({ addCard, getAllCards })