const router = require('express').Router();
const cardController = require('../controllers/card-controller');

router.post("/addCard", cardController.addCard);
router.get("/getCards", cardController.getAllCards);

module.exports = router