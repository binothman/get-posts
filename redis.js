import { redisClient } from "./index.js";

export async function getRedisPosts(limit = 10, offset = 0) {
  try {
    let results = [];
    const max = limit + offset - 1;
    const posts = await redisClient.zRange("posts", offset, max, {
      REV: true,
    });

    posts.map((post) => {
      results.push(JSON.parse(post));
    });
    return results;
  } catch (err) {
    return [];
  }
}
