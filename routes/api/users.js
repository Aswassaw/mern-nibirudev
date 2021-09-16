const express = require("express");
const { registerController } = require("../../controllers/users");
const { registerValidation } = require("../../validation/users");

const router = express.Router();

// @route  | POST api/users
// @desc   | Endpoint untuk mendaftarkan user baru
// @access | Public
router.post("/", registerValidation, registerController);

module.exports = router;
