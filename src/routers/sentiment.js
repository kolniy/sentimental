import express from "express";
import getSentiment from "../utitlities/getSentiment.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;
  const sentiment = getSentiment(text);
  return res.json({
    sentiment,
  });
});

export default router;
