const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");



const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login')
  }
  next();
}


// home 
router.route.('/').get( (req, res) => {
  res.send('home page');
})

// register 
router.route.('/register').get((req, res) => {
  res.render('register');
})

router.route.('/register').post(registerUser)

// login 
router.route.('/login').get((req, res) => {
  res.render('login')
})

router.route.('./login').post(async (req, resxt) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password)
  if (foundUser) {
    req.session.user_id= foundUser._id;
    res.redirect('/secret');
  } else {
    res.redirect('/login');
  }
})

// logout
router.route.('/logout').post((res, req) => {
  // req.session.user_id = null;
  req.session.destroy();
  res.redirect('/login');
})



// route once logged in
router.route.('/secret').get(requireLogin, (req, res) => {
  res.render('secret')
})











function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
    expiresIn: "3600s"
  });
}


router.route("/register").post((req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }

  const newUser = new User({ username, password });
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            const token = generateAccessToken(user.id, user.username);
            res.json({
              token,
              user
            });
          });
        });
      });
    }
  });
});

router.route("/login").post((req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }
  User.findOne({ username: username.toLowerCase() }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        const token = generateAccessToken(user.id, user.username);

        res.json({
          token,
          user
        });
      });
    }
  });
});

module.exports = router;