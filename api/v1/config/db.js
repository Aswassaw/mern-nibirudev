const mongoose = require("mongoose");
const { MONGO_URI } = require("./default");

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected.");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
