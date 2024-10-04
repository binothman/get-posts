import express from "express";
import compression from "compression";
import redis from "redis";
import { getRedisPosts } from "./redis.js";

const app = express();

const PORT = process.env.PORT || 4000;

export const redisClient = redis.createClient({
  url: "redis://default:mgpnoCLgHTDOpZflxfHqsabhihYriWjE@junction.proxy.rlwy.net:46125",
});

app.use(compression(), express.json({ limit: "50mb" }));

app.use("/redis", async function (req, res) {
  res.send({
    success: 0,
  });
});

app.listen(PORT, () => {
  console.log(`live on ${PORT}`);
});
