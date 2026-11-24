---
slug: "youtube"
title: "YouTube 最新影片"
weight: 1
hideMeta: true
ShowToc: false
TocOpen: false
ShowPostNavLinks: false
---

#### 點進來看看吧 ！搞不好有你喜歡的影片
<style>
  .yt-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1rem;
  }
  .yt-item {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .yt-media {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
  }
  .yt-media img,
  .yt-media iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
    margin: 0 !important;
    border-radius: 0 !important;
  }
  .yt-play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 54px;
    height: 38px;
    background: rgba(15, 15, 15, 0.85);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;
  }
  .yt-media:hover .yt-play-btn {
    background: #ff0000;
  }
  .yt-play-btn::after {
    content: "";
    border-style: solid;
    border-width: 7px 0 7px 13px;
    border-color: transparent transparent transparent #fff;
    margin-left: 2px;
  }
  .yt-title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .yt-date {
    font-size: 0.8rem;
    color: var(--secondary);
    margin-top: -0.35rem;
  }
</style>

<div class="yt-list" id="yt-list"></div>

<script>
(async () => {
  const CHANNEL_ID = "UCO46ZMleJZsNyZnpKYVYWLw";
  const COUNT = 10;
  const list = document.getElementById("yt-list");
  const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);

  try {
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await res.json();
    if (data.status !== "ok" || !data.items?.length) throw new Error();

    list.innerHTML = data.items.slice(0, COUNT).map(item => {
      const vid = item.guid.split(":")[2];
      const date = item.pubDate.split(" ")[0];
      const safeTitle = item.title.replace(/"/g, "&quot;");
      return `
        <div class="yt-item">
          <div class="yt-media" data-vid="${vid}">
            <img src="https://i.ytimg.com/vi/${vid}/hqdefault.jpg" alt="${safeTitle}" loading="lazy">
            <div class="yt-play-btn"></div>
          </div>
          <div class="yt-title">${item.title}</div>
          <div class="yt-date">${date}</div>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".yt-media").forEach(box => {
      box.addEventListener("click", () => {
        const vid = box.dataset.vid;
        if (!vid || box.dataset.loaded) return;
        box.dataset.loaded = "1";
        box.style.cursor = "default";
        box.innerHTML = `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }, { once: true });
    });
  } catch {
    list.style.display = "block";
    list.innerHTML = `
      <div class="yt-media" style="cursor: default;">
        <iframe src="https://www.youtube.com/embed/videoseries?list=UUO46ZMleJZsNyZnpKYVYWLw" allowfullscreen></iframe>
      </div>`;
  }
})();
</script>
