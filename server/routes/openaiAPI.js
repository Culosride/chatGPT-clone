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

  const chatTitle = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `Come up with a short title for a chat starting with this message: ${req.body.msg}` },
      { role: "user", content: req.body.msg },
    ],
    max_tokens: 20,
  })

  res.status(200).json({
    message: completion.data.choices[0].message,
    id: completion.data.id,
    chatTitle: chatTitle.data.choices[0].message.content,
  });
};

// ROUTES //
router.post("/completion", generateMsg);

export default router;
