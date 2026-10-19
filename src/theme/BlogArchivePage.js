import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';

// 計算特定年份的天數與週陣列
function getYearDays(year) {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const days = [];
  const curr = new Date(startDate);

  // 補齊第一週前的空位 (以星期日為一週開始)
  const startDayOfWeek = startDate.getDay();
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  while (curr <= endDate) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return days;
}

export default function BlogArchivePage({ archive }) {
  // 整理所有文章資料
  const allPosts = useMemo(() => {
    return archive.years.flatMap((yearGroup) => yearGroup.posts);
  }, [archive]);

  // 取得所有年份列表 (倒序)
  const years = useMemo(() => {
    return archive.years.map((y) => parseInt(y.year, 10)).sort((a, b) => b - a);
  }, [archive]);

  const [selectedYear, setSelectedYear] = useState(years[0] || new Date().getFullYear());

  // 計算特定日期的文章數量映射 (YYYY-MM-DD -> count)
  const postsCountByDate = useMemo(() => {
    const map = {};
    allPosts.forEach((post) => {
      const dateStr = post.metadata.date.split('T')[0];
      map[dateStr] = (map[dateStr] || 0) + 1;
    });
    return map;
  }, [allPosts]);

  // 當前選取年份的文章
  const currentYearPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const year = new Date(post.metadata.date).getFullYear();
      return year === selectedYear;
    });
  }, [allPosts, selectedYear]);

  // 當前年份的日曆網格資料
  const yearDays = useMemo(() => getYearDays(selectedYear), [selectedYear]);

  // 月份標題位置標記
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <>
      <PageMetadata title={`歷史文章 (${allPosts.length}篇)`} />
      <Layout>
        <main className="container margin-vert--lg" style={{ maxWidth: '800px' }}>
          {/* 總文章數 */}
          <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            歷史文章 · {allPosts.length} 篇
          </h1>

          {/* 年份選擇按鈕 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '2.5rem' }}>
            {years.map((y) => (
              <span
                key={y}
                onClick={() => setSelectedYear(y)}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedYear === y ? 'bold' : 'normal',
                  color: selectedYear === y ? '#2ea44f' : 'var(--ifm-color-content-secondary)',
                  fontSize: '1.1rem',
                }}
              >
                {y}
              </span>
            ))}
          </div>

          {/* 當前選取年份標題 */}
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {selectedYear} · {currentYearPosts.length} 篇
          </h2>

          {/* GitHub 風格貢獻圖 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-200)',
              marginBottom: '2rem',
              overflowX: 'auto',
            }}
          >
            {/* 月份標籤 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '4px', marginBottom: '8px', color: '#8b949e', fontSize: '0.8rem' }}>
              {monthLabels.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            {/* 格子網格 (7行直排) */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 12px)',
                gridAutoFlow: 'column',
                gridAutoColumns: '12px',
                gap: '3px',
              }}
            >
              {yearDays.map((date, idx) => {
                if (!date) {
                  return <div key={`empty-${idx}`} style={{ width: '12px', height: '12px' }} />;
                }
                const dateStr = date.toISOString().split('T')[0];
                const count = postsCountByDate[dateStr] || 0;

                // 顏色深淺設定
                let bgColor = '#161b22'; // 無發文
                if (count === 1) bgColor = '#0e4429';
                else if (count === 2) bgColor = '#006d32';
                else if (count >= 3) bgColor = '#39d353';

                return (
                  <div
                    key={dateStr}
                    title={`${dateStr}: ${count} 篇文章`}
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: bgColor,
                      borderRadius: '2px',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* 文章列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentYearPosts.map((post) => {
              const dateStr = post.metadata.date.split('T')[0];
              return (
                <div key={post.metadata.permalink} style={{ display: 'flex', gap: '16px', fontFamily: 'monospace' }}>
                  <span style={{ color: 'var(--ifm-color-content-secondary)' }}>{dateStr}</span>
                  <Link to={post.metadata.permalink} style={{ color: '#2ea44f', textDecoration: 'none' }}>
                    {post.metadata.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </main>
      </Layout>
    </>
  );
}
