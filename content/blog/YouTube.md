
---
slug: "youtube"
title: "YouTube 最新影片"
weight: 1
hideMeta: true
ShowToc: false
TocOpen: false
ShowPostNavLinks: false
---

#### 點進來看看吧！搞不好有你喜歡的影片 ~

<div class="kai-youtube">

  <div class="kai-youtube-header">
    <div>
      <span class="kai-youtube-label">KAI STUDIO · YOUTUBE</span>
      <h3>最新上傳</h3>
      <p>最近的影片，都在這裡。</p>
    </div>
    <a href="https://www.youtube.com/channel/UCO46ZMleJZsNyZnpKYVYWLw"
       target="_blank"
       rel="noopener noreferrer"
       class="kai-youtube-link">
      YouTube ↗
    </a>
  </div>

  <div class="kai-youtube-player">
    <iframe
      src="https://www.youtube.com/embed/videoseries?list=UUO46ZMleJZsNyZnpKYVYWLw"
      title="KAI STUDIO 最新上傳影片"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>

  <div class="kai-youtube-footer">
    <span>更多影片，持續更新中。</span>
    <a href="https://www.youtube.com/channel/UCO46ZMleJZsNyZnpKYVYWLw"
       target="_blank"
       rel="noopener noreferrer">
      前往頻道觀看 →
    </a>
  </div>

</div>

<style>
.kai-youtube {
  margin-top: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--entry);
}

.kai-youtube-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 22px;
}

.kai-youtube-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: var(--secondary);
}

.kai-youtube-header h3 {
  margin: 7px 0 3px;
  font-size: 1.35rem;
  color: var(--primary);
}

.kai-youtube-header p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--secondary);
}

.kai-youtube-link {
  flex-shrink: 0;
  padding: 8px 13px;
  border: 1px solid var(--border);
  border-radius: 9px;
  color: var(--primary);
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.2s ease;
}

.kai-youtube-link:hover {
  background: var(--tertiary);
}

.kai-youtube-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  overflow: hidden;
}

.kai-youtube-player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0 !important;
}

.kai-youtube-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid var(--border);
  font-size: 0.82rem;
  color: var(--secondary);
}

.kai-youtube-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}

.kai-youtube-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .kai-youtube-header {
    padding: 17px;
  }

  .kai-youtube-footer {
    padding: 13px 16px;
  }
}
</style>
