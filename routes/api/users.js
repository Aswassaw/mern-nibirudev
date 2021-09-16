const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { registerValidation } = require("../../validation/users");

// @route  | POST api/users
// @desc   | Endpoint untuk mendaftarkan user baru
// @access | Public
router.post("/", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  res.json(req.body);
});

module.exports = router;
