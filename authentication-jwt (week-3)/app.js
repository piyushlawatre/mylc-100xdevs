import express from "express";
import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log("Request Logger");
  console.log(`${req.method} : ${req.url}`);
  next();
});

app.get("/", (req, res, next) => {
  res.json({ result: "Function: bound parserOnIncoming" });
});

app.post("/sign-up", (req, res, next) => {
  try {
    const User = z.object({
      email: z.string().email(),
      password: z.string().max(6).max(12),
    });
    const user = req.body;
    User.parse(user);
    z.string().email();
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started At Port ${process.env.PORT}`);
});
