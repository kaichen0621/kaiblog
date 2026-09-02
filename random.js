import { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';

export default function RandomPage() {
  const history = useHistory();
  const [loadingText, setLoadingText] = useState('🎲 正在抓取全站頁面並跳轉...');

  useEffect(() => {
    async function getRandomPage() {
      try {
        // 直接抓取 Docusaurus 預設生成的 sitemap.xml
        const response = await fetch('/sitemap.xml');
        if (!response.ok) throw new Error('無法讀取 sitemap');
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const locElements = xmlDoc.querySelectorAll('loc');

        const pages: string[] = [];
        locElements.forEach((el) => {
          if (el.textContent) {
            try {
              const url = new URL(el.textContent);
              const path = url.pathname;
              
              // 過濾掉隨機頁面本身（避免循環）以及不用出現的頁面
              if (path && !path.includes('/random') && path !== '/404.html') {
                pages.push(path);
              }
            } catch (e) {
              // 忽略無效 URL
            }
          }
        });

        if (pages.length > 0) {
          const randomPath = pages[Math.floor(Math.random() * pages.length)];
          history.replace(randomPath);
        } else {
          setLoadingText('❌ 找不到可用頁面，請自行加油！');
        }
      } catch (error) {
        setLoadingText('❌ 抓取頁面失敗（可能在本地開發環境中），請自行加油！');
      }
    }

    getRandomPage();
  }, [history]);

  return (
    <div>
      <h1>{loadingText}</h1>
      <p>註：如果在本地開發環境（localhost）會因為沒有 sitemap 而失敗，但部署上線後即可正常運作。</p>
    </div>
  );
}
