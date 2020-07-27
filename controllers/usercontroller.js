let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/user");
const jwt = require("jsonwebtoken");

router.post("/create", function (req, res) {
  let userModel = {
    email: req.body.user.email,
    password: req.body.user.password,
  };
  User.create(userModel)
    .then(function (user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );

      res.json({
        user: user,
        message: "User successfully created!",
        sessionToekn: token,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.post("/login", function (req, res) {
  User.findOne({ where: { email: req.body.user.email } })
    .then(function loginSuccess(user) {
      if (user) {
        let token = jwt.sign({ id: user.id }, "i_am_secret", {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          user: user,
          message: "User successfully logged in!",
          sessionToken: token,
        });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
