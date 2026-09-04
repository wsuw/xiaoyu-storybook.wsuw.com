import { create } from 'storybook/internal/theming';

// 使用自定义 SVG 矢量 Logo，确保直接替换掉 Storybook 默认的红色 S 图标与文字
const logoSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="34" viewBox="0 0 160 34">
  <text x="4" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', sans-serif" font-size="20" font-weight="800" fill="#0f172a">小鱼的故事书</text>
  <circle cx="140" cy="18" r="4" fill="#6366f1" />
</svg>
`);

export default create({
  base: 'light',
  brandTitle: '小鱼的故事书',
  brandUrl: '/',
  brandImage: `data:image/svg+xml;utf8,${logoSvg}`,
  brandTarget: '_self',
});
