import React from 'react';

export interface AbsDefinitionProps {}

export const AbsDefinition: React.FC<AbsDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #84cc160f 0%, #a3e6351a 100%)',
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
          abs(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a3e63560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#84cc16',
            boxShadow: '0 4px 12px -2px #84cc1615',
          }}
        >
          abs(#OffsetX) * #Depth
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#84cc16' }} />
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
              color: '#84cc16',
              marginBottom: '16px',
            }}
          >
            abs(#OffsetX) * #Depth
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“不管往左偏还是往右偏，只取正数距离算板材面积/缺口尺寸。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#OffsetX</code>：避让柱子或管道的 X 轴偏移坐标（往右为正数如 <code>+120</code>，往左为负数如 <code>-120</code>）。
              <br />
              • <code>abs(...)</code>：绝对值函数。把负数直接变成正数（<code>abs(-120) = 120</code>），确保后续相乘不会算出负面积或非法板件厚度。
              <br />
              • <code>#Depth</code>：柜体深度（如 <code>300mm</code>）。
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
            borderLeft: '4px solid #84cc16',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：避让左侧柱子（负偏移）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 输入：<code>#OffsetX = -120mm</code>，<code>#Depth = 300mm</code>
                <br />
                • 计算：<code>abs(-120) * 300 = 120 * 300</code>
                <br />
                • 结果：扣减面积为 <strong>36,000 mm²</strong>（0.036 ㎡），绝不会因负号算成负数损耗！
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：避让右侧柱子（正偏移）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 输入：<code>#OffsetX = +120mm</code>，<code>#Depth = 300mm</code>
                <br />
                • 计算：<code>abs(120) * 300 = 120 * 300</code>
                <br />
                • 结果：扣减面积同样为正数 <strong>36,000 mm²</strong>，左右对称工艺一式套用。
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
              borderTop: '4px solid #84cc16',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>左右异形开缺算料</strong>：无论向左切还是向右切，面积损耗与材料结算永远保持正数；</li>
              <li><strong>空间相对距离计算</strong>：两块板件坐标之差 <code>abs(#X1 - #X2)</code>，不用管谁在左谁在右；</li>
              <li><strong>消除三维坐标方向符号干扰</strong>：直接把位移转换成下料切割图纸的长度。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #a3e635',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              剥离空间坐标的正负方向性，提取纯粹的位移标量用于材料加工与耗材统计，杜绝报价系统出现“负面积抵扣”的严重Bug。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#84cc16',
                background: '#84cc160d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：左右凸柱包管避让缺口算料（可在左侧切换进入【2. 3D 故事与交互演练】调节 offset 看开缺演练）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
