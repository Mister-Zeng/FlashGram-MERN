const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const session = require('express-session');;
const bodyParser = require('body-parser')
const User = './models/user-model';
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: "somethingsecret", resave: true,  saveUninitialized: true}))

const uri = process.env.ATLAS_URI;
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri);
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});





// listening 
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

