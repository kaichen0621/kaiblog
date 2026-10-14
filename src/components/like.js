import React, { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '2.5rem 0',
      padding: '1.5rem',
      background: 'rgba(66, 158, 238, 0.05)',
      border: '1px solid rgba(66, 158, 238, 0.2)',
      borderRadius: '16px',
    }}>
      <p style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.1rem' }}>
        覺得這篇文章有幫助嗎？給個鼓勵吧！👏
      </p>
      <button
        onClick={handleLike}
        style={{
          display: 'flex',
          alignItem: 'center',
          gap: '8px',
          padding: '12px 24px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: hasLiked ? '#fff' : 'var(--ifm-color-primary)',
          background: hasLiked ? 'var(--ifm-color-primary)' : 'transparent',
          border: '2px solid var(--ifm-color-primary)',
          borderRadius: '30px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: hasLiked ? '0 4px 15px rgba(66, 158, 238, 0.4)' : 'none',
        }}
      >
        <span>{hasLiked ? '❤️ 已拍手' : '🤍 拍手鼓勵'}</span>
        <span style={{
          background: hasLiked ? 'rgba(255,255,255,0.2)' : 'rgba(66, 158, 238, 0.1)',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.9rem'
        }}>
          {likes}
        </span>
      </button>
    </div>
  );
}
