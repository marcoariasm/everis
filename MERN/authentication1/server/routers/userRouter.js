const router = require("express").Router();
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER A NEW USER
router.post("/", async (req, res) => {
  try {
    // res.send("test");
    const { email, password, passwordVerify } = req.body;
    // res.send(req.body);
    // console.log("body->",req.body);
    // console.log("passwordVerify->",passwordVerify);

    // validation
    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice" });

    const existingUser = await User.findOne({ email });
    console.log("existingUser ->", existingUser);
    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: "An account with this email already exists" });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // console.log("hash->", passwordHash);

    // save a new user account to db

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // log the user in and sign the token
    // only my server is gonna be able to log an user
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // console.log("token->", token);

    // secure method is to save in http only cookie, not in  localstorage
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// LOG IN AN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ errorMessage: "Wrogn email or passsword" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(400).json({ errorMessage: "Wrogn email or passsword" });

    //   sign the token
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token to httpOnly
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// clear the cookie
router.get("/logout", (req, res ) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    .send();
})

module.exports = router;
