const express = require('express')
const User = require('../modal/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const JWT_SECRET = "Khaw$r *S a Goo*d B)";

// Route 1 : create a user
router.post("/createuser", [
  body('name', 'Name must be atleast 3 character').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // If there are error return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check whether the user with this email exist already
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      success = false;
      return res.status(400).json({ "error": "This email already exists" });
    }

    let salt = bcrypt.genSaltSync(10);
    let secPassword = bcrypt.hashSync(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
    });

  
    success = true;
    res.json({ success })

  } catch (error) {
    console.log(error.message);
  }
})

// Route 2 :  Fecth user detail
router.get("/getuser", fetchUser, async (req, res) => {

  try {
    let userId = req.user.id;
    const user = await User.findById(userId);
    res.json(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Route 3 : create a user
router.post("/login", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }
  
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) { res.status(400).json({ error: "Please try to login with correct credential" }) }

  const passwordCompare = await bcrypt.compare(password, user.password);


  if (!passwordCompare) {
    res.status(400).json({ error: "Please try to login with correct credential" })
  }

  const data = {
    user: {
      id: user.id
    }
  };

  let authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({ success, authtoken })

});

module.exports = router;