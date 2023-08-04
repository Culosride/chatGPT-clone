import express from "express";
import dotenv from "dotenv";
import { openai } from "../index.js";
// import axios from "axios";

dotenv.config();
const router = express.Router();

// CONTROLLERS //
export const generateMsg = async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: req.body.msg },
    ],
    max_tokens: 100,
  });
  res.status(200).json({
    message: completion.data.choices[0].message,
  });
};

// ROUTES //

router.post("/test", async (req, res) => {
  console.log(req.body);
  try {
    const { msg } = req.body;
    console.log(msg);
    res.status(200).json({ msg });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: message.error });
  }
});

router.post("/completion", generateMsg);

export default router;
