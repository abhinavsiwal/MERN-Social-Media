const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User"); //Import User Model

//@route  POST api/user
//@desc Register User
//@access Public

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
      //See if user exists or not
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User Already Exists",
            },
          ],
        });
      }

      //Get user gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg",
        d: "mm", //default icon
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Saving User to Database;
      await user.save();

      //Return Json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
          console.log(token);
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
