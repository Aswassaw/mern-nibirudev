const { validationResult } = require("express-validator");
const request = require("request");
const config = require("config");
const Profile = require("../models/Profile");
const User = require("../models/User");

// Controller untuk endpoint: GET api/profile/me
const getCurrentProfile = async (req, res) => {
  try {
    // Mengambil data profile sekaligus menghubungkan dengan data user (mirip join)
    const profile = await Profile.findOne({ userId: req.user.id }).populate(
      "userId",
      ["name", "avatar"]
    );

    // Jika profile tidak tersedia
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: POST api/profile
const postCurrentProfile = async (req, res) => {
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
  profileFields.userId = req.user.id; // Id for ref
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
    let profile = await Profile.findOne({ userId: req.user.id });

    // Jika profile belum ada (create new profile)
    if (!profile) {
      // Create new User instance (data untuk dimasukkan ke db)
      const newProfile = new Profile(profileFields);
      await newProfile.save();

      return res.json(newProfile);
    }

    // Jika profile sudah ada (update current profile)
    profile = await Profile.findOneAndUpdate(
      { userId: req.user.id }, // id data yang akan diupdate
      { $set: profileFields }, // Data baru
      { new: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: GET api/profile
const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId", [
      "name",
      "avatar",
    ]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: GET api/profile/user/:user_id
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.user_id,
    }).populate("userId", ["name", "avatar"]);

    // Jika profile tidak tersedia
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // Jika error karena ObjectId tidak valid
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not found" });
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: DELETE api/profile/user/:user_id
const deleteUserById = async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove Profile
    await Profile.findOneAndRemove({ userId: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: PUT api/profile/experience
const putProfileExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    // Unshift adalah kebalikan dari Push
    profile.experience.unshift(newExp);
    await profile.save();

    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: DELETE api/profile/experience/exp_id
const deleteProfileExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1)
      return res.status(404).json({ msg: "Experience not found" });

    // Menghapus berdasarkan removeIndex dengan method splice
    profile.experience.splice(removeIndex, 1);
    profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: PUT api/profile/education
const putProfileEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  const { school, degree, fieldOfStudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    // Unshift adalah kebalikan dari Push
    profile.education.unshift(newEdu);
    await profile.save();

    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: DELETE api/profile/education/edu_id
const deleteProfileEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex === -1)
      return res.status(404).json({ msg: "Education not found" });

    // Menghapus berdasarkan removeIndex dengan method splice
    profile.education.splice(removeIndex, 1);
    profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller untuk endpoint: GET api/profile/github/:username
const getGithubRepo = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (err, response, body) => {
      if (err) console.error(err);

      // Jika statusCode tidak 200
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github Profile Found" });
      }

      res.json(JSON.parse(body)); 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCurrentProfile,
  postCurrentProfile,
  getAllProfile,
  getProfileByUserId,
  deleteUserById,
  putProfileExperience,
  deleteProfileExperience,
  putProfileEducation,
  deleteProfileEducation,
  getGithubRepo
};
