import express from "express";
import { Leap } from "@leap-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

declare var process: {
  env: {
    [LEAP_API_KEY: string]: string;
  };
};

const app = express();
const port = 3000;
const leap = new Leap(process.env.LEAP_API_KEY);

// create a route
app.get("/", async (req, res) => {
  res.send(`
    <form method="post" action="/generate">
      <label for="prompt">Enter your prompt:</label><br>
      <input type="text" id="prompt" name="prompt"><br>
      <input type="submit" value="Submit">
    </form>
  `);
});

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  const { data, error } = await leap.generate.generateImage({ prompt });

  if (error) {
    res.status(500).send({
      error: error.message,
    });
  }

  res.send(`
        <img src="${data?.images[0].uri}" alt="Generated image" />
    `);
});


