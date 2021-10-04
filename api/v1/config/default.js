const AUTHOR = "Andry Pebrianto";
const PORT = process.env.PORT || 4000;
const URI = `http://localhost:${PORT}`;
// const MONGO_URI =
// "mongodb://localhost:27017/nibirudev";
const MONGO_URI =
"mongodb+srv://aswassaw:aswassaw@cluster0.8ixwj.mongodb.net/dev-social-media?retryWrites=true&w=majority";
const JWT_SECRET = "q9crtgi872gcndeu392gd3g27xdhx78deyb67iudg37n";
const GITHUB_CLIENT_ID = "40378102574d76804ff1";
const GITHUB_SECRET = "a027f9da183cb3088d3100257930a91a48e1a787";

module.exports = {
  AUTHOR,
  PORT,
  URI,
  MONGO_URI,
  JWT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_SECRET,
};
