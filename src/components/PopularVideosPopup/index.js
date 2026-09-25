import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

// 定義推薦影片庫
const POPULAR_VIDEOS = [
  { title: 'KAI-LIVE | 中秋連假隨機直播！DAY01', url: 'https://www.youtube.com/watch?v=zaT7QzLuTb0' },
  { title: 'RAP 玩刀刃球？DAY 02 刀刃球直播精華', url: 'https://www.youtube.com/watch?v=3CageRLzzTs' },
  { title: '哇啊啊怎麼死的？DAY 01 的刀刃球直播精華', url: 'https://www.youtube.com/watch?v=hgL4u_FrZ6Y' },
  { title: 'COMMING SOON', url: 'https://www.youtube.com/watch?v=jKhop-3K-os' },
  { title: 'KAI-LIVE丨在 Roblox 贏就可以獲得獎金 60000 元？ DAY 04 X 必勝攻略', url: 'https://www.youtube.com/watch?v=UXBgBZzRg9k' },
  { title: 'KAI丨我在刀刃球花了 2000 元？', url: 'https://www.youtube.com/watch?v=1ONMcBTNGzY' },
  { title: 'KAI丨新手怎麼玩 ROBLOX 刀刃球？開始跳舞？？', url: 'https://www.youtube.com/watch?v=Ih9FuiLO71Y' },
  { title: 'KAI丨簡單時礦，沒有特效最存粹的 Youtube 影片！', url: 'https://www.youtube.com/watch?v=3GZSVA3ORPc' },
  { title: 'KAI丨玩到爆氣絕對不簡單的跑酷油戲', url: 'https://www.youtube.com/watch?v=WwdG5b0TyTY' },
  { title: '202606.12 科技音樂展演', url: 'https://www.youtube.com/watch?v=agG72fFN2qk' },
  { title: '自主學習成果發表！', url: 'https://www.youtube.com/watch?v=4wFP6WreQbQ' },
  { title: 'KAI丨我邊玩 Roblox 邊看老高？？？', url: 'https://www.youtube.com/watch?v=5tZtzktPoBo' },
  { title: 'KAI丨最猛展演！新巡迴～', url: 'https://www.youtube.com/watch?v=myQK4w8ld4c' },
  { title: '第二次成果發表，感謝自強國中來！！！ #music', url: 'https://www.youtube.com/watch?v=v0ktInPlrRU' },
  { title: '楓的指揮夢！', url: 'https://www.youtube.com/watch?v=5L5hjyX-6FQ' },
  { title: '《愛情萬歲》裡最執著的篇章', url: 'https://www.youtube.com/watch?v=MRkkEu8uIRw' },
  { title: '5/22 在太空劇場等你！！！', url: 'https://www.youtube.com/watch?v=l-ngoUPKduQ' },
  { title: 'libertango01 by Composer : KAI', url: 'https://www.youtube.com/watch?v=zcc7fSuC1os' },
  { title: '5/22 前導預告！ #music #cover', url: 'https://www.youtube.com/watch?v=jm94tDDeykg' },
  { title: '我從未公開的自創曲？極度致敬古典樂曲？', url: 'https://www.youtube.com/watch?v=oi-4GypcwJQ' },
  { title: 'KAI丨我把 MAYDAY 所有經典元素都放進去了？', url: 'https://www.youtube.com/watch?v=NIDVdo82CvE' },
  { title: '我把 太陽之子 變成 鋼琴超技練習曲了？', url: 'https://www.youtube.com/watch?v=IVL7LQItJyQ' },
  { title: '我把 MAYDAY 變成 鋼琴練習曲了？', url: 'https://www.youtube.com/watch?v=bD7kN9YuHj0' },
  { title: '小偷在幹嘛啦? 不會逃跑喔? Kai | Roblox', url: 'https://www.youtube.com/watch?v=wV9V3kKZ2k4' },
  { title: 'Kai | 玩 Steam 玩到硬碟不夠了？ Parallels Desktop 26 擴充教學！', url: 'https://www.youtube.com/watch?v=ZrHhCbalgZ8' },
  { title: 'Kai | MAYDAY 五月天 [ 勇敢Braveness ] COVER', url: 'https://www.youtube.com/watch?v=S-IzjjQ-Hnc' },
  { title: 'Kai | MAYDAY 五月天 [ 2012 特別版 ] MAYDAY FLY TO 2023 COVER', url: 'https://www.youtube.com/watch?v=QVy1UhwQvvA' },
  { title: 'Kai | 編曲製作 五月天 後來的我們 COVER', url: 'https://www.youtube.com/watch?v=G67NGl7Refc' },
  { title: '？我在競爭者玩到哭了，小孩不要玩！Kai | Roblox', url: 'https://www.youtube.com/watch?v=Pw0dToX74yg' },
  { title: 'Kai | 徹爾尼改寫', url: 'https://www.youtube.com/watch?v=H4drYRNntSQ' },
  { title: 'Kai | Roblox 殺手居然只在我旁邊s', url: 'https://www.youtube.com/watch?v=WapZvYyQCJM' },
  { title: 'Kai | Roblox 我手禪黨一直死的床戰特輯..s', url: 'https://www.youtube.com/watch?v=BJMVBuqAu4I' },
  { title: 'Kai | Roblox 森林99夜', url: 'https://www.youtube.com/watch?v=6ZSiOl8Lf3I' },
  { title: '越獄古墓不誇張，還是難 #short', url: 'https://www.youtube.com/watch?v=dhjGg90q6QY' },
  { title: 'MAD-CITY 當中逃獄不簡單🥹 #shorts', url: 'https://www.youtube.com/watch?v=Q5GVSxOgCfQ' },
  { title: '床戰真的好難！精華#01 #shorts', url: 'https://www.youtube.com/watch?v=RwY7TbtCkzE' },
  { title: 'Kai | 第一次玩床戰，我能活下去嗎？', url: 'https://www.youtube.com/watch?v=BPj9niHOXKE' },
  { title: 'Kai | Roblox 逃離金字塔！這次震得不誇張！', url: 'https://www.youtube.com/watch?v=7Y-Q6kF-6BU' },
  { title: 'Kai | Roblox 逃離瘋狂城市的古墓！史上最瘋狂', url: 'https://www.youtube.com/watch?v=71uH-_huJBA' },
  { title: 'Kai ｜Roblox 越獄！古墓搶劫~差點炫耀特斯拉!!s', url: 'https://www.youtube.com/watch?v=TeadhR_Yuj8' },
  { title: 'Kai ｜Roblox 越獄！仙桃出去再說吧', url: 'https://www.youtube.com/watch?v=1naAnfNBRSY' },
  { title: 'Kai ｜Roblox 誰是殺手 2！低階PPT電腦也可以玩！', url: 'https://www.youtube.com/watch?v=wyptLHEvedw' },
];

export default function PopularVideosPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const randomIndex = Math.floor(Math.random() * POPULAR_VIDEOS.length);
    setSelectedVideo(POPULAR_VIDEOS[randomIndex]);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible || !selectedVideo) return null;

  // 從 YouTube 網址提取影片 ID 以獲取縮圖
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(selectedVideo.url);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : 'https://via.placeholder.com/320x180?text=YouTube+Video';

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastCard}>
        <div className={styles.header}>
          <h3>{selectedVideo.title}</h3>
        </div>

        <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
          <div className={styles.thumbnailWrapper}>
            <img src={thumbnailUrl} alt={selectedVideo.title} className={styles.thumbnail} />
            <div className={styles.playOverlay}>
              <div className={styles.playButton}>▶</div>
            </div>
          </div>
          <span className={styles.clickText}>點擊跳轉至 YouTube 觀看</span>
        </a>

        <div className={styles.footer}>
          <button className={styles.doneButton} onClick={closePopup}>
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
