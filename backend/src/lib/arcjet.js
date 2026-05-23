import { ENV } from "./env.js";
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN" }),
    // Create a bot detection rule
    detectBot({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
        mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
        capacity: process.env.NODE_ENV === "production" ? 30 : 1000,
        refillRate: process.env.NODE_ENV === "production" ? 10 : 1000,
        interval: 60000  // 60 seconds in milliseconds
    }),
  ],
});

export default aj;