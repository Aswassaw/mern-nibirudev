const { validationResult } = require("express-validator");
const Profile = require("../models/Profile");

// Controller untuk endpoint: GET api/profile/me
const getCurrentProfileController = async (req, res) => {
  try {
    // Mengambil data profile sekaligus menghubungkan dengan data user (mirip join)
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // Jika profile tidak tersedia
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: POST api/profile
const postCurrentProfileController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id; // Id for ref
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubUsername) profileFields.githubUsername = githubUsername;
  if (skills)
    profileFields.skills = skills.split(",").map((skill) => skill.trim());

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // Jika profile belum ada (create new profile)
    if (!profile) {
      // Create new User instance (data untuk dimasukkan ke db)
      const newProfile = new Profile(profileFields);
      await newProfile.save();

      return res.json(newProfile);
    }

    // Jika profile sudah ada (update current profile)
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id }, // id data yang akan diupdate
      { $set: profileFields }, // Data baru
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getCurrentProfileController, postCurrentProfileController };
