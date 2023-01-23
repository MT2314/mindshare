module.exports = {
  // ATLAS_URI:
  // "mongodb+srv://mike2314:5967111782001@cluster0.cxfqmbv.mongodb.net/test",
  mongoURI: process.env.ATLAS_URI || "mongodb://127.0.0.1:27017",
  secretOrKey: "secret",
};
