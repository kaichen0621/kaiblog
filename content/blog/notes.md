---
title: "便利貼"

weight: 1
hideMeta: true
TocOpen: false
---

## 文字
歡迎大家提及我的網站，讓我的網站訂閱者越來越多
> 2026.11.14 10：38

## 快照

<style>
  .story-stack-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 280px;
    margin: 20px 0;
  }
  .story-stack {
    position: relative;
    width: 220px;
    height: 220px;
    cursor: pointer;
    user-select: none;
  }
  .story-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border: 3px solid #ff7a00;
    background: #1e1e1e;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
  }

  /* 堆疊錯落感 */
  .story-card:nth-child(1) {
    transform: rotate(-4deg) translateY(0px);
    z-index: 2;
  }
  .story-card:nth-child(2) {
    transform: rotate(6deg) translateY(8px) scale(0.95);
    z-index: 1;
    filter: brightness(0.85);
  }

  /* 點擊動畫：正在滑出的卡片 */
  .story-card.fade-out {
    transform: translateY(120px) rotate(15deg) scale(0.9) !important;
    opacity: 0;
    pointer-events: none;
  }

  .story-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    margin: 0 !important;
  }
  .story-time {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    font-size: 11px;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    padding: 4px 8px;
    border-radius: 10px;
    text-align: center;
  }

  /* 全部看完後的提示 */
  .story-empty {
    display: none;
    width: 220px;
    height: 220px;
    border-radius: 24px;
    border: 2px dashed rgba(255, 255, 255, 0.2);
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
    text-align: center;
  }
</style>

<div class="story-stack-container">
  <div class="story-stack" id="storyStack" title="點擊切換下一張快照">
    <!-- 第一張卡片 (最上層) -->
    <div class="story-card" data-id="story-20261114-3">
      <img src="/img/mayday/mayday_map.png" alt="快照" loading="lazy">
      <span class="story-time">2026.11.14 10:40</span>
    </div>
    <!-- 第二張卡片 (被疊在底下) -->
    <div class="story-card" data-id="story-20261114-2">
      <img src="/img/KAI_LOGO_B.png" alt="快照" loading="lazy">
      <span class="story-time">2026.11.14 09:15</span>
    </div>
    <!-- 全部看完的預留框 -->
    <div class="story-empty" id="storyEmpty">已看完所有今日快照 ✨</div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const stack = document.getElementById("storyStack");
    const cards = Array.from(stack.querySelectorAll(".story-card"));
    const emptyView = document.getElementById("storyEmpty");
    const STORAGE_KEY = "kai_read_stories_20261114"; // 可依日期調整 key

    // 初始化：檢查 localStorage，把看過的卡片直接隱藏
    let readStories = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    
    cards.forEach(card => {
      const id = card.getAttribute("data-id");
      if (readStories.includes(id)) {
        card.style.display = "none";
      }
    });

    checkRemaining();

    // 點擊事件：點一下就滑走最上層卡片
    stack.addEventListener("click", function () {
      const activeCards = cards.filter(card => card.style.display !== "none" && !card.classList.contains("fade-out"));
      if (activeCards.length === 0) return;

      const topCard = activeCards[0];
      const id = topCard.getAttribute("data-id");

      // 加入已讀並寫入 localStorage
      if (!readStories.includes(id)) {
        readStories.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readStories));
      }

      // 觸發滑出動畫
      topCard.classList.add("fade-out");

      setTimeout(() => {
        topCard.style.display = "none";
        checkRemaining();
      }, 350); // 等待 CSS 動畫結束
    });

    function checkRemaining() {
      const remaining = cards.filter(card => card.style.display !== "none");
      if (remaining.length === 0) {
        emptyView.style.display = "flex";
        stack.style.cursor = "default";
      }
    }
  });
</script>


## == Archive ==

我覺得很假
> 2026.11.12 17：11

我居然在新竹火車站聽到高鐵的發車鈴聲欸！！！
> 2026.11.09 22：41


- 跑 1600 m 是誰發明的
> 2026.11.09 17：00
- 拍畢業照
> 2026.11.09 08：50
- 音樂會順利結束啦 ~ 
> 2026.11.07 12：33
