---
slug: "youtube"
title: "YouTube 最新影片"
weight: 1
hideMeta: true
ShowToc: false
TocOpen: false
ShowPostNavLinks: false
summary: "點進來看看吧！搞不好有你喜歡的影片～"
description: "KAI STUDIO YouTube 頻道最新影片。"
---

#### 點進來看看吧！搞不好有你喜歡的影片～

<!--more-->

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
    <div id="kai-youtube-player"></div>
  </div>

  <div class="kai-youtube-info">
    <span class="kai-youtube-info-label">NOW PLAYING</span>
    <div id="kai-youtube-title">正在載入影片資訊……</div>
  </div>

  <div class="kai-youtube-footer">
    <span>KAI STUDIO</span>
    <span>更多精彩影片，持續更新中。</span>
  </div>

</div>

<style>
.kai-youtube {
  margin-top: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--entry);
  color: var(--primary);
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
  color: var(--primary) !important;
  font-size: 0.85rem;
  text-decoration: none !important;
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

#kai-youtube-player,
#kai-youtube-player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0 !important;
}

.kai-youtube-info {
  padding: 17px 22px;
  border-top: 1px solid var(--border);
}

.kai-youtube-info-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: var(--secondary);
}

#kai-youtube-title {
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 600;
  color: var(--primary);
  overflow-wrap: anywhere;
}

.kai-youtube-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 13px 20px;
  border-top: 1px solid var(--border);
  font-size: 0.78rem;
  color: var(--secondary);
}

@media (max-width: 480px) {
  .kai-youtube-header {
    padding: 17px;
  }

  .kai-youtube-info {
    padding: 15px 17px;
  }

  .kai-youtube-footer {
    padding: 12px 16px;
  }
}
</style>

<script>
(function () {
  const titleElement = document.getElementById("kai-youtube-title");
  const playerElement = document.getElementById("kai-youtube-player");

  if (!titleElement || !playerElement) return;

  const PLAYLIST_ID = "UUO46ZMleJZsNyZnpKYVYWLw";

  let player;
  let attempts = 0;
  let titleTimer;

  function updateTitle() {
    if (!player || !player.getVideoData) return;

    const video = player.getVideoData();

    if (video && video.title) {
      titleElement.textContent = video.title;
      return true;
    }

    return false;
  }

  function startTitleCheck() {
    clearInterval(titleTimer);

    attempts = 0;

    titleTimer = setInterval(() => {
      attempts++;

      if (updateTitle() || attempts >= 20) {
        clearInterval(titleTimer);
      }
    }, 500);
  }

  function initPlayer() {
    if (player || !window.YT || !window.YT.Player) return;

    player = new YT.Player("kai-youtube-player", {
      width: "100%",
      height: "100%",

      playerVars: {
        listType: "playlist",
        list: PLAYLIST_ID,
        playsinline: 1,
        rel: 0
      },

      events: {
        onReady: function () {
          titleElement.textContent = "正在載入影片資訊……";
          startTitleCheck();
        },

        onStateChange: function (event) {
          if (
            event.data === YT.PlayerState.PLAYING ||
            event.data === YT.PlayerState.CUED
          ) {
            startTitleCheck();
          }
        },

        onError: function () {
          titleElement.textContent = "目前無法載入影片，請稍後再試。";
        }
      }
    });
  }

  if (window.YT && window.YT.Player) {
    initPlayer();
  } else {
    window.onYouTubeIframeAPIReady = initPlayer;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    document.head.appendChild(script);
  }
})();
</script>
