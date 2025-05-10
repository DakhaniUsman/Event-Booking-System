import express from "express";
import AllRoutes from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose"
const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const connectDatabase = async() => {
   await mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
}

app.use("/api/v1/", AllRoutes)

app.listen(8000, async() => {
    await connectDatabase();
  console.log("Server is running on port 8000");
});
