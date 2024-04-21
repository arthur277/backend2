const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post('/register', userController.registerUser);

/* --- TEST ROUTES --- */
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;