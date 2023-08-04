import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import openAiRoutes from "./routes/openaiAPI.js"
// import { generateMsg } from "./src/controllers/chat-controller.js"

// APP CONFIGURATION //
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"))

// OPENAI CONFIGURATION //
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY
})
export const openai = new OpenAIApi(configuration)

// ROUTES //
app.use("/openai", openAiRoutes) // parent route


// SERVER SETUP //
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
