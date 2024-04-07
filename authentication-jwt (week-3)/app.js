import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import Joi from "joi";
import { UserSchema } from "./schema.js";
import { signUp } from "./user.service.js";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/health-check", (req, res, next) => {
  res.json({
    statusCode: 200,
    message: "Success",
  });
});

app.post("/sign-up", async (req, res, next) => {
  try {
    const user = req.body;
    // Validation
    const { error, value } = UserSchema.validate(user);
    if (error) {
      throw new Error(error);
    }
    await signUp(user);

    res.json({
      statusCode: 200,
      message: "User Crated Successfully",
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.json({
    statusCode: 500,
    message: "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
