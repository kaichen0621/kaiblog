
export default async function handler(req, res) {
  const CHANNEL_ID = "UCO46ZMleJZsNyZnpKYVYWLw";

  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const feedURL =
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const response = await fetch(feedURL, {
      cache: "no-store",
      headers: {
        "User-Agent": "KAI-BLOG/1.0"
      }
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS HTTP ${response.status}`);
    }

    const xml = await response.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    const decode = (str) =>
      str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#(\d+);/g, (_, n) =>
          String.fromCodePoint(Number(n))
        )
        .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
          String.fromCodePoint(parseInt(n, 16))
        );

    const getTag = (entry, tag) => {
      const match = entry.match(
        new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`)
      );

      return match ? decode(match[1].trim()) : "";
    };

    const videos = entries.slice(0, 10).map(([_, entry]) => {
      const id = getTag(entry, "yt:videoId");

      return {
        id,
        title: getTag(entry, "title"),
        published: getTag(entry, "published"),
        thumbnail: id
          ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
          : "",
        url: id
          ? `https://www.youtube.com/watch?v=${id}`
          : ""
      };
    }).filter(video => video.id);

    if (!videos.length) {
      throw new Error("YouTube RSS 沒有影片資料");
    }

    return res.status(200).json({
      success: true,
      count: videos.length,
      videos
    });

  } catch (error) {
    console.error("[KAI YouTube API]", error);

    return res.status(502).json({
      success: false,
      error: error.message || "無法取得 YouTube RSS"
    });
  }
}
