---
slug: youtube
title: YouTube 最新影片
weight: 1
hideMeta: true
ShowToc: false
TocOpen: false
ShowPostNavLinks: false
---

#### 點進來看看吧 ！搞不好有你喜歡的影片 ~

<div class="yt-list" id="yt-list">
  <p>正在載入 YouTube 最新影片……</p>
</div>

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
  min-width: 0;
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

.yt-error {
  color: var(--secondary);
  font-size: 0.9rem;
}
</style>

<script>
(async () => {
  const list = document.getElementById("yt-list");

  if (!list) return;

  try {
    const response = await fetch(
      "/api/youtube",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`API HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.videos?.length) {
      throw new Error(data.error || "沒有影片資料");
    }

    list.innerHTML = "";

    data.videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "yt-item";

      const media = document.createElement("div");
      media.className = "yt-media";

      const img = document.createElement("img");
      img.src = video.thumbnail;
      img.alt = video.title;
      img.loading = "lazy";

      const play = document.createElement("div");
      play.className = "yt-play-btn";

      media.append(img, play);

      media.addEventListener("click", () => {
        if (media.dataset.loaded) return;

        media.dataset.loaded = "1";

        const iframe = document.createElement("iframe");

        iframe.src =
          `https://www.youtube.com/embed/${encodeURIComponent(video.id)}?autoplay=1`;

        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

        iframe.allowFullscreen = true;

        media.replaceChildren(iframe);
        media.style.cursor = "default";
      });

      const title = document.createElement("div");
      title.className = "yt-title";
      title.textContent = video.title;

      const date = document.createElement("div");
      date.className = "yt-date";

      const parsedDate = new Date(video.published);

      date.textContent = isNaN(parsedDate)
        ? ""
        : parsedDate.toLocaleDateString("zh-TW");

      card.append(media, title, date);
      list.appendChild(card);
    });

  } catch (error) {
    console.error("[KAI YouTube]", error);

    list.innerHTML = "";

    const message = document.createElement("p");
    message.className = "yt-error";
    message.textContent =
      "目前無法載入最新影片，請稍後再試。";

    const link = document.createElement("a");
    link.href = "https://www.youtube.com/channel/UCO46ZMleJZsNyZnpKYVYWLw";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "前往 YouTube 頻道觀看";

    list.append(message, link);
  }
})();
</script>
