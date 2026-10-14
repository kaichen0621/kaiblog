import React, { useState } from 'react';

export default function MoodButton() {
  // 定義幾句隨機出現的心情語錄
  const quotes = [
    "「財力根本不重要，是奧客的人就會是奧客。」",
    "「創作 vs. 執行，今天選哪一個？」",
    "「以上我沒有結論，只是無聊時的腦內碎碎唸。」",
    "「會珍惜的人就是會珍惜。」"
  ];

  const [currentQuote, setCurrentQuote] = useState("點擊下方按鈕，抽今天的隨機碎碎唸 🎲");

  // 這就是 JS 函數：點擊時執行的邏輯
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div style={{ padding: '1.5rem', border: '2px dashed var(--ifm-color-primary)', borderRadius: '12px', textAlign: 'center', margin: '2rem 0' }}>
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {currentQuote}
      </p>
      <button 
        onClick={getRandomQuote}
        style={{
          padding: '10px 20px',
          background: 'var(--ifm-color-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        抽一句金句
      </button>
    </div>
  );
}
