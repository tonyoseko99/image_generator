import { Leap } from "@leap-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

declare var process: {
  env: {
    [LEAP_API_KEY: string]: string;
  };
};

const main = async () => {
  const leap = new Leap(process.env.LEAP_API_KEY);
  const prompt = "The quick brown fox jumps over the lazy dog.";
  const { data, error } = await leap.generate.generateImage({ prompt });

  console.log(data?.images[0].uri);
};

main();
