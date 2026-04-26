import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors(config.cors));
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message
    });

    res.json({
      reply: response.text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Gemini API server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});