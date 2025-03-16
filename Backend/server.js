import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import router from "./routers/lyricRouter.js";

dotenv.config();  

const app = express();
app.use(express.json());
const url = process.env.MONGO_URL;
if (!url) {
  console.error("MONGO_URL is missing in .env file!");
  process.exit(1);
}

console.log("MongoDB URL:", url); 
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  });

app.use(cors());
app.use(express.json());  
app.use(router);
const PORT=process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:5000");
}); 
