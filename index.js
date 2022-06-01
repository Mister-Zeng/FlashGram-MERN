const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require('bcrypt');
const app = express();
const User = './models/user-model'

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri);
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});

app.get('/', (req, res, next) => {
  res.send('home page')
})

app.get('/register', (req, res, next) => {
  res.render('register')
})

app.post('/register', (req, res, next) => {
  const { password, fullname, email, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
    email,
    fullname
  })
  await user.save();
  res.redirect('/')
})

app.get('/login', (req, res, next) => {
  res.render('login')
})

app.post('./login', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassowrd = await bcrypt.compare(password, user.password);
  if (validPassowrd) {
    res.send("Login successfully")
  } else {
    res.send('Wrong credential')
  }
})


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

