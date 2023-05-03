import express from "express";
import { Leap } from "@leap-ai/sdk";
import dotenv from "dotenv";
import Midjourney from "midjourney-discord-api";


dotenv.config();

declare var process: {
  env: {
    [LEAP_API_KEY: string]: string;
  };
};

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const leap = new Leap(process.env.LEAP_API_KEY);

// create a route
app.get("/", async (req, res) => {
  res.send(`
      <html>
        <head>
          <style>
            /* Add CSS rules here */
            form {
              margin: 20px;
              padding: 10px;
              border: 1px solid black;
            }
            label {
              font-size: 18px;
              margin-bottom: 5px;
            }
            input[type="text"] {
              width: 100%;
              padding: 10px;
              font-size: 16px;
              border-radius: 5px;
              border: 1px solid #ccc;
              margin-bottom: 10px;
            }
            input[type="submit"] {
              background-color: #4CAF50;
              color: white;
              padding: 12px 20px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            input[type="submit"]:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <form method="post" action="/generate">
            <label for="prompt">Enter your prompt:</label><br>
            <input type="text" id="prompt" name="prompt"><br>
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `);
});

app.post("/generate", async (req, res) => {
              const prompt = req.body.prompt;
const client = new Midjourney("keymj.txt");
const prompts: string[] = await client.describeUrl(
  prompt,
);
console.log("reversed prompt: ", prompts);
  //const prompt = req.body.prompt;
  //const { data, error } = await leap.generate.generateImage({ prompt });

  
  res.send(`
  <style>
    /* Add CSS rules here */
    img {
      display: block;
      margin: 0 auto;
      border: 1px solid black;
      max-width: 100%;
    }
  </style>
  <img src="${prompts}" alt="Generated image" />
`);
});

// start the Express server
app.listen(4200, () => {
  console.log(`server started at http://localhost:${port}`);
});
