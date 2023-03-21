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

