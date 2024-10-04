import { redisClient } from "./index.js";

export async function getRedisPosts(limit = 10, offset = 0) {
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
