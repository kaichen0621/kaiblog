import React, { useState, useEffect } from 'react';

export default function LikeButton({ id = 'default-post' }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // 雲端 API 空間名稱 (用你的部落格名稱做區隔)
  const namespace = 'kaiblog-likes';
  const key = id;

  // 1. 頁面載入時，自動去雲端抓取目前的最新點讚總數
  useEffect(() => {
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setLikes(data.count);
        } else {
          setLikes(0);
        }
        setLoading(false);
      })
      .catch(() => {
        setLikes(0);
        setLoading(false);
      });

    // 檢查本地是否已經按過讚
    const likedInStorage = localStorage.getItem(`liked_${key}`);
    if (likedInStorage === 'true') {
      setHasLiked(true);
    }
  }, [key]);

  // 2. 點擊按鈕時，發送 +1 到雲端資料庫
  const handleLike = () => {
    if (hasLiked) return; // 如果按過了就不重複觸發

    setHasLiked(true);
    setLikes((prev) => prev + 1);
    localStorage.setItem(`liked_${key}`, 'true');

    // 發送觸發計數 +1
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setLikes(data.count);
        }
      })
      .catch((err) => console.error('Count update failed', err));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2.5rem 0',
        padding: '1.5rem',
        background: 'rgba(66, 158, 238, 0.05)',
        border: '1px solid rgba(66, 158, 238, 0.2)',
        borderRadius: '16px',
      }}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.1rem' }}>
        覺得這篇文章有幫助嗎？給個鼓勵吧！👏
      </p>
      <button
        onClick={handleLike}
        disabled={hasLiked}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: hasLiked ? '#fff' : 'var(--ifm-color-primary)',
          background: hasLiked ? 'var(--ifm-color-primary)' : 'transparent',
          border: '2px solid var(--ifm-color-primary)',
          borderRadius: '30px',
          cursor: hasLiked ? 'default' : 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: hasLiked ? '0 4px 15px rgba(66, 158, 238, 0.4)' : 'none',
          opacity: loading ? 0.6 : 1,
        }}
      >
        <span>{hasLiked ? '❤️ 已按讚' : '🤍 按讚鼓勵'}</span>
        <span
          style={{
            background: hasLiked ? 'rgba(255,255,255,0.2)' : 'rgba(66, 158, 238, 0.1)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.9rem',
          }}
        >
          {loading ? '...' : likes}
        </span>
      </button>
    </div>
  );
}
