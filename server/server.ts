import express, { Request, Response } from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

app.post("/api/generate-text", async (req: Request, res: Response) => {
  const { prompt } = req.body as { prompt: string }; // Explicitly type the request body
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use a supported model
      messages: [{ role: "user", content: prompt }], // Update to match the expected format
      max_tokens: 100,
      temperature: 0.7,
    });
    res.json({ text: response.choices[0].message?.content?.trim() }); // Adjust to match the response format of the new model
  } catch (error) {
    console.error("Error generating text:", error); // Add logging for debugging
    res.status(500).json({ error: "Failed to fetch the meaning" });
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
