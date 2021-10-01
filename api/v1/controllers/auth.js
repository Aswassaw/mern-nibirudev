const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const { sendEmail } = require("../helpers/email");
const createHtmlForEmail = require("../helpers/createHtmlForEmail");
const { JWT_SECRET } = require("../config/default");

// Controller: v1/auth/register
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    // Mencegah agar tidak ada email duplikat
    if (user)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });

    // Mendapatkan link profile gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // Membuat instance baru dari model User
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      avatar,
      password,
    });

    // Membuat enkripsi password menggunakan bcript
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Menyimpan data user baru ke database
    await newUser.save();

    // Menyimpan token verifikasi ke database
    const token = crypto.randomBytes(30).toString("hex");
    const newToken = new Token({
      token,
      email: newUser.email,
      type: "Verify Account",
    });
    await newToken.save();

    // Mengirim email verifikasi
    const templateEmail = {
      from: "NibiruDev",
      to: newUser.email,
      subject: "Verify Your Account!",
      html: createHtmlForEmail("Registrasi User", newToken.token),
    };
    sendEmail(templateEmail);

    // Mengembalikan jsonwebtoken
    jwt.sign(
      {
        user: {
          id: newUser.id,
        },
      },
      JWT_SECRET,
      {
        expiresIn: 18000, // Waktu kedaluwarsa lima jam
      },
      (err, token) => {
        if (err) throw err;

        // Mengembalikan jwt token
        res.json({ msg: "Register success", token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/auth/login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Memastikan email yang dimasukkan ada di database
    if (!user)
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });

    // Memastikan password benar
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch)
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });

    // Mengembalikan jsonwebtoken
    jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      JWT_SECRET,
      {
        expiresIn: 18000, // Waktu kedaluwarsa lima jam
      },
      (err, token) => {
        if (err) throw err;

        // Mengembalikan jwt token
        res.json({ msg: "Login success", token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/auth/verify
const verify = async (req, res) => {
  if (!req.body.token)
    return res
      .status(400)
      .json({ errors: [{ msg: "No token, Verification denied" }] });

  try {
    const token = await Token.findOne({ token: req.body.token });
    if (!token)
      return res
        .status(400)
        .json({ errors: [{ msg: "Token is not valid, Verification failed" }] });

    if (Date.now() - Date.parse(token.date) > 1800000)
      // 30 Menit
      return res.status(400).json({
        errors: [
          {
            msg: "Token has expired, Verification failed. Try requesting a new token",
          },
        ],
      });

    // Mengubah data verified user
    const user = await User.findOne({ email: token.email });
    user.verified = true;
    user.save();

    // Delete token
    await token.remove();

    res.json({ msg: "Congratulations! Your account has been verified" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/auth/verify/resend
const resendVerify = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(400)
        .json({ errors: [{ msg: "User is not valid, resend token failed" }] });

    if (user.verified)
      return res
        .status(400)
        .json({ errors: [{ msg: "User already verified" }] });

    const token = await Token.findOne({ email: user.email });
    // Menghapus token verifikasi lama
    if (token) await token.remove();

    // Menyimpan token verifikasi baru ke database
    const newToken = new Token({
      token: crypto.randomBytes(30).toString("hex"),
      email: user.email,
      type: "Verify Account",
    });
    await newToken.save();

    // Mengirim email verifikasi
    const templateEmail = {
      from: "NibiruDev",
      to: user.email,
      subject: "Verify Your Account!",
      html: createHtmlForEmail("Registrasi User", newToken.token),
    };
    sendEmail(templateEmail);

    res.json({ msg: "New token successfully resend" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { register, login, verify, resendVerify };
