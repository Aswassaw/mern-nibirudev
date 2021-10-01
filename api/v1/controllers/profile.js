const { validationResult } = require("express-validator");
const request = require("request");
const { GITHUB_CLIENT_ID, GITHUB_SECRET } = require("../config/default");
const Profile = require("../models/Profile");

// Controller: v1/profile
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

      return res.json({ msg: "Profile added" });
    }

    // Jika profile sudah ada (update current profile)
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    res.json({ msg: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile
const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/me
const getCurrentProfile = async (req, res) => {
  try {
    // Mengambil data profile sekaligus menghubungkan dengan data user (mirip join)
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // Jika profile tidak tersedia
    if (!profile) return res.status(404).json({ msg: "You have no profile" });

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/me
const deleteCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "You have no profile" });

    await profile.remove();

    return res.json({ msg: "Profile deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/user/:user_id
const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    // Jika profile tidak tersedia
    if (!profile) return res.status(404).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err);
    // Jika error karena ObjectId tidak valid
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Profile not found" });
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/experience
const postProfileExperience = async (req, res) => {
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
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "You have no profile" });
    // Unshift adalah kebalikan dari Push
    profile.experience.unshift(newExp);
    await profile.save();

    res.json({ msg: "Experience added" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/experience/exp_id
const deleteProfileExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1)
      return res.status(404).json({ msg: "Experience not found" });

    // Menghapus berdasarkan removeIndex dengan method splice
    profile.experience.splice(removeIndex, 1);
    profile.save();

    res.json({ msg: "Experience deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/education
const postProfileEducation = async (req, res) => {
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
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ msg: "You have no profile" });
    // Unshift adalah kebalikan dari Push
    profile.education.unshift(newEdu);
    await profile.save();

    res.json({ msg: "Education added" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Education added" });
  }
};

// Controller: v1/profile/education/edu_id
const deleteProfileEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex === -1)
      return res.status(404).json({ msg: "Education not found" });

    // Menghapus berdasarkan removeIndex dengan method splice
    profile.education.splice(removeIndex, 1);
    profile.save();

    res.json({ msg: "Education deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Controller: v1/profile/github/:username
const getGithubRepo = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (err, response, body) => {
      if (err) console.error(err);

      // Jika statusCode tidak 200
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  postCurrentProfile,
  getAllProfile,
  getCurrentProfile,
  deleteCurrentProfile,
  getProfileByUserId,
  postProfileExperience,
  deleteProfileExperience,
  postProfileEducation,
  deleteProfileEducation,
  getGithubRepo,
};
