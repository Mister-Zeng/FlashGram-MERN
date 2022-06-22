import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'
import 'dotenv/config';


import postRouter from './routes/post-route.js'
import userRouter from './routes/user-route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const main = async () => {
  await mongoose.connect(uri);
}
main().catch(err => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});


// listening 
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
