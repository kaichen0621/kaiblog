---
slug: "youtube"
title: "YouTube 最新影片"
weight: 1
hideMeta: true
TocOpen: false
---

<style>
  .yt-showcase {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin-top: 1rem;
  }
  .yt-hero-card {
    background: var(--entry);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
  }
  .yt-player-wrap {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    background: #000;
  }
  .yt-player-wrap iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .yt-hero-meta {
    padding: 1rem 1.25rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }
  .yt-hero-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--primary);
    margin: 0;
  }
  .yt-badge {
    display: inline-block;
    background: #ff0000;
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .yt-sub-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ff0000;
    color: #fff !important;
    text-decoration: none !important;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 999px;
    transition: opacity 0.2s;
  }
  .yt-sub-btn:hover {
    opacity: 0.88;
  }
  .yt-section-header {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .yt-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.1rem;
  }
  .yt-card {
    background: var(--entry);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  .yt-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    border-color: #429EEE;
  }
  .yt-card.active {
    border: 2px solid #ff0000;
  }
  .yt-thumb-box {
    position: relative;
    padding-bottom: 56.25%;
    background: #111;
    overflow: hidden;
  }
  .yt-thumb-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0 !important;
    border-radius: 0 !important;
  }
  .yt-play-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .yt-card:hover .yt-play-overlay {
    opacity: 1;
  }
  .yt-play-icon {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.1rem;
    padding-left: 3px;
  }
  .yt-card-body {
    padding: 0.85rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  .yt-card-title {
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0.45rem;
  }
  .yt-card-date {
    font-size: 0.78rem;
    color: var(--secondary);
  }
</style>

<div class="yt-showcase">
  <!-- 頂部主播放器（預設自動載入最新影片） -->
  <div class="yt-hero-card" id="yt-hero">
    <div class="yt-player-wrap">
      <iframe
        id="yt-main-player"
        src="https://www.youtube.com/embed/videoseries?list=UUO46ZMleJZsNyZnpKYVYWLw"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <div class="yt-hero-meta">
      <div>
        <span class="yt-badge" id="yt-now-badge">最新上傳</span>
        <span class="yt-hero-title" id="yt-now-title">KAI STUDIO 最新影片</span>
      </div>
      <a class="yt-sub-btn" href="https://www.youtube.com/@kaistudio-621?sub_confirmation=1" target="_blank" rel="noopener">
        ▶ 訂閱頻道
      </a>
    </div>
  </div>

  <!-- 近期影片列表 -->
  <div class="yt-section-header">近期發布影片（點擊可於上方預覽播放）</div>
  <div class="yt-grid" id="yt-video-grid">
    <div style="color: var(--secondary); font-size: 0.9rem;">正在同步頻道最新影片列表...</div>
  </div>
</div>

<script>
(async () => {
  const CHANNEL_ID = "UCO46ZMleJZsNyZnpKYVYWLw";
  const MAX_ITEMS = 6;
  const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  const grid = document.getElementById("yt-video-grid");
  const player = document.getElementById("yt-main-player");
  const nowTitle = document.getElementById("yt-now-title");
  const nowBadge = document.getElementById("yt-now-badge");

  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await res.json();
    if (data.status !== "ok" || !data.items || data.items.length === 0) {
      throw new Error("Empty feed");
    }

    const videos = data.items.slice(0, MAX_ITEMS).map(item => {
      const videoId = item.guid.split(":")[2];
      const pubDate = item.pubDate.split(" ")[0];
      return {
        id: videoId,
        title: item.title,
        date: pubDate,
        thumb: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
      };
    });

    // 自動設定第一部最新影片的標題
    nowTitle.textContent = videos[0].title;

    grid.innerHTML = videos.map((v, idx) => `
      <div class="yt-card ${idx === 0 ? "active" : ""}" data-vid="${v.id}" data-title="${v.title.replace(/"/g, "&quot;")}" data-idx="${idx}">
        <div class="yt-thumb-box">
          <img src="${v.thumb}" alt="${v.title.replace(/"/g, "&quot;")}" loading="lazy">
          <div class="yt-play-overlay">
            <div class="yt-play-icon">▶</div>
          </div>
        </div>
        <div class="yt-card-body">
          <div class="yt-card-title">${v.title}</div>
          <div class="yt-card-date">發布日期：${v.date}</div>
        </div>
      </div>
    `).join("");

    // 點擊卡片切換上方主播放器並自動播放
    grid.querySelectorAll(".yt-card").forEach(card => {
      card.addEventListener("click", () => {
        const vid = card.getAttribute("data-vid");
        const title = card.getAttribute("data-title");
        const idx = card.getAttribute("data-idx");

        player.src = `https://www.youtube.com/embed/${vid}?autoplay=1`;
        nowTitle.textContent = title;
        nowBadge.textContent = idx === "0" ? "最新上傳" : "正在播放";

        grid.querySelectorAll(".yt-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        document.getElementById("yt-hero").scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  } catch (err) {
    // 若外部 RSS 服務暫時達到頻率上限，隱藏列表區塊，保留上方原生最新影片播放器正常運作
    grid.previousElementSibling.style.display = "none";
    grid.style.display = "none";
  }
})();
</script>
