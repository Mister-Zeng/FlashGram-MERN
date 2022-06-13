import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';


import postRouter from './routes/post-route.js'
import userRouter from './routes/user-route.js'

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use("/post", postRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static("client / build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build / index.html"));
  });
}


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

