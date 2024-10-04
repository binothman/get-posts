import express from "express";
import compression from "compression";
import redis from "redis";
// import expressCache from "cache-express";
// import cache from "express-cache-headers";
const app = express();

const PORT = process.env.PORT || 4000;

const redisClient = redis.createClient({
  url: "redis://default:mgpnoCLgHTDOpZflxfHqsabhihYriWjE@junction.proxy.rlwy.net:46125",
});

await redisClient.connect();

async function getRedisPosts(limit = 10, offset = 0) {
  try {
    let results = [];
    const max = limit + offset - 1;
    const posts = await redisClient.zRange("posts", offset, max, {
      REV: true,
    });

    posts.map((post) => {
      const data = JSON.parse(post);
      results.push({
        id: data.id,
        title: data.title,
        date: data.date,
        url: data.url,
        main_image: data.main_image,
        images: data.images,
        drive_img_id: data.drive_img_id,
        status: data.status,
        is_related_to_yemen: data.is_related_to_yemen,
        states: data.states,
        countries: data.countries,
        categories: data.categories,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        host: data.host,
        is_duplicated: data.is_duplicated,
        test: data.test,
        summary: data.summary,
        keywords: data.keywords,
      });
    });
    return results;
  } catch (err) {
    return [];
  }
}

// (async () => {
//   redisClient.on("error", (err) => console.log("Redis Client Error", err));
//   redisClient.on("ready", () => {
//     console.log("Redis Client Connected!");
//   });

//   await redisClient.connect();
// })();

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
