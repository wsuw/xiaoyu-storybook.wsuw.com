import React from 'react';

export interface CeilDefinitionProps {}

export const CeilDefinition: React.FC<CeilDefinitionProps> = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1e293b',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: '16px 28px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, #06b6d40f 0%, #67e8f91a 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.5px',
          }}
        >
          ceil(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #67e8f960',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#06b6d4',
            boxShadow: '0 4px 12px -2px #06b6d415',
          }}
        >
          ceil(#H / 400)
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        {/* 1. 公式标准原型与直白通俗解释 */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#06b6d4' }} />
            公式标准原型与定义
          </h3>
          <div
            style={{
              background: '#f1f5f9',
              padding: '14px 18px',
              borderRadius: '8px',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '15px',
              fontWeight: 600,
              color: '#06b6d4',
              marginBottom: '16px',
            }}
          >
            ceil(#H / 400)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“向上进位取整。只要多出一点点零头，就补齐一整份，宁多勿少，防止跨度过大悬空。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#H</code>：总高度或总跨度（例如书架总高 <code>2200mm</code>）。
              <br />
              • <code>400</code>：隔板建议的最大跨距间距（<code>400mm</code>），超过就会导致单层太高、书籍不稳或层板下垂。
              <br />
              • <code>ceil(...)</code>：向上取整函数。比如除出来是 <code>5.5 份</code>，必须向上补到 <code>6 份</code>，哪怕最上面一层间距稍小，也绝不让任何一层超宽悬空。
            </p>
          </div>
        </div>

        {/* 2. 真实计算举例 */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '24px 28px',
            border: '1px solid #e2e8f0',
            borderLeft: '4px solid #06b6d4',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 1：货架高度 2200mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>2200 / 400 = 5.5</code>
                <br />
                • 取整：<code>ceil(5.5) = 6</code>
                <br />
                • 结果：向上补齐划分为 <strong>6 格</strong>（需 5 块活动层板），平均每格约 366mm，完全在安全承重跨距内。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 2：货架高度 2050mm（仅多出 50mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>2050 / 400 = 5.125</code>
                <br />
                • 取整：<code>ceil(5.125) = 6</code>
                <br />
                • 结果：坚决向上补齐到 <strong>6 格</strong>！若舍去当 5 格，每格达 410mm 超出规范，可能导致放重物变形。
              </div>
            </div>
          </div>
        </div>

        {/* 3. 应用场景与工程价值 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #06b6d4',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>高柜隔板密度补足</strong>：防止跨距过大导致物品倾倒或板材弯曲；</li>
              <li><strong>五金包/螺丝配件采购包数</strong>：有零头必须多买 1 包备用；</li>
              <li><strong>踢脚线/收边条根数算料</strong>：2.44米一根，多出20公分也必须多领 1 根。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #67e8f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              向上补齐，宁可多算一组构件与五金材料，也绝不让工程现场出现因缺料停工或跨度超标的安全隐患。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#06b6d4',
                background: '#06b6d40d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：展示货架绝不悬空的隔板计算（可在左侧切换进入【2. 3D 故事与交互演练】拉动高度观察隔板自动向上补齐）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
