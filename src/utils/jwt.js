const jwt = require("jsonwebtoken");
const query = require("../utils/query");
// const queryBuiler = require("../querybuilders/querybuilder");
module.exports = {
  jwtTokenCreate: async (userData) => {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // expiring in 24 hrs
        id: userData._id,
        date: Date.now() / 1000,
      },
      "secret"
    );
  },
  jwtTokenVerify: async (req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ");
      const UserDbModel = req.User;
      var decoded = jwt.verify(token[1], "secret");
      const params = {
        user_id: decoded.id
      }
      let resultdata = await query.find(UserDbModel, { _id: decoded.id });
      if (resultdata && resultdata.length) {
        next()
        return
      }
      res.json({ status: 401, message: "Authentication failed" })
    } catch (error) {
      res.json({ status: 401, message: "Authentication failed" })
    }
  },
};