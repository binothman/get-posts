import express from "express";
import compression from "compression";
import redis from "redis";
import { getRedisPosts } from "./redis.js";

const app = express();

const PORT = process.env.PORT || 4000;

export const redisClient = redis.createClient({
  url: "redis://default:mgpnoCLgHTDOpZflxfHqsabhihYriWjE@junction.proxy.rlwy.net:46125",
});

(async () => {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  redisClient.on("ready", () => {
    console.log("Redis Client Connected!");
  });

  await redisClient.connect();
})();

app.use(compression(), express.json({ limit: "50mb" }));

app.use("/redis", async function (req, res) {
  const { limit, offset } = req.query;

  const data = await Promise.all([
    getRedisPosts(parseInt(limit) || undefined, parseInt(offset) || undefined),
    redisClient.zCount("posts", "-inf", "+inf"),
  ]);

  res.send({
    count: data[0].length,
    total: data[1],
    posts: data[0],
  });
});

app.listen(PORT, () => {
  console.log(`live on ${PORT}`);
});
