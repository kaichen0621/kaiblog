import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

// 定義推薦影片庫
const POPULAR_VIDEOS = [
  { title: 'KAI | 中秋連假隨機直播！DAY01', url: 'https://www.youtube.com/watch?v=zaT7QzLuTb0' },
  { title: 'RAP 玩刀刃球？DAY 02 刀刃球直播精華', url: 'https://www.youtube.com/watch?v=3CageRLzzTs' },
  { title: '哇啊啊怎麼死的？DAY 01 的刀刃球直播精華', url: 'https://www.youtube.com/watch?v=hgL4u_FrZ6Y' },
  { title: 'COMMING SOON', url: 'https://www.youtube.com/watch?v=jKhop-3K-os' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=UXBgBZzRg9k' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=1ONMcBTNGzY' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=Ih9FuiLO71Y' },
  { title: 'KAI丨簡單時礦，沒有特效最存粹的 Youtube 影片！', url: 'https://www.youtube.com/watch?v=3GZSVA3ORPc' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=WwdG5b0TyTY' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=agG72fFN2qk' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=4wFP6WreQbQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=5tZtzktPoBo' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=myQK4w8ld4c' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=v0ktInPlrRU' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=5L5hjyX-6FQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=MRkkEu8uIRw' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=l-ngoUPKduQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=zcc7fSuC1os' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=jm94tDDeykg' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=oi-4GypcwJQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=NIDVdo82CvE' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=IVL7LQItJyQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=bD7kN9YuHj0' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=wV9V3kKZ2k4' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=ZrHhCbalgZ8' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=S-IzjjQ-Hnc' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=QVy1UhwQvvA' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=G67NGl7Refc' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=Pw0dToX74yg' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=H4drYRNntSQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=WapZvYyQCJM' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=BJMVBuqAu4I' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=6ZSiOl8Lf3I' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=dhjGg90q6QY' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=Q5GVSxOgCfQ' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=RwY7TbtCkzE' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=BPj9niHOXKE' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=7Y-Q6kF-6BU' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=71uH-_huJBA' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=TeadhR_Yuj8' },
  { title: '精選推薦影片', url: 'https://www.youtube.com/watch?v=1naAnfNBRSY' },
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
