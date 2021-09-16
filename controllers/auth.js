const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../models/User");

const registerController = async (req, res) => {
  const errors = validationResult(req);
  // Jika terdapat error saat validasi
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // Check if user exist (agar email tidak duplikat)
    if (user)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });

    // Get user gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // Create new UserModel instance (data untuk dimasukkan ke db)
    const newUser = new UserModel({
      name,
      email,
      avatar,
      password,
    });

    // Encrypt password using bcriptjs
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Saving data to database
    await newUser.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 18000, // Waktu kedaluwarsa lima jam
      },
      (err, token) => {
        if (err) throw err;

        // Mengembalikan jwt token
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const loginController = async (req, res) => {
  const errors = validationResult(req);
  // Jika terdapat error saat validasi
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // Check if user exist
    if (!user)
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });

    // Check password
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch)
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 18000, // Waktu kedaluwarsa lima jam
      },
      (err, token) => {
        if (err) throw err;

        // Mengembalikan jwt token
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { registerController, loginController, getUserController };
