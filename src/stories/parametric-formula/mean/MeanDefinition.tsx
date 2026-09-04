import React from 'react';

export interface MeanDefinitionProps {}

export const MeanDefinition: React.FC<MeanDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #8b5cf60f 0%, #c4b5fd1a 100%)',
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
          mean([x1, x2, ...])
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #c4b5fd60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#8b5cf6',
            boxShadow: '0 4px 12px -2px #8b5cf615',
          }}
        >
          mean([#Y1, #Y2, #Y3])
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#8b5cf6' }} />
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
              color: '#8b5cf6',
              marginBottom: '16px',
            }}
          >
            mean([#Y1, #Y2, #Y3])
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“计算算术平均值（找平衡中心点）：把一组坐标高度加起来除以数量。例如柜内设计了 3 块错落高低不一的展示层板，想在中间立一根美观的通体拉手或竖向中剖线，用 mean([#Y1, #Y2, #Y3]) 就能瞬间算出它们几何正中心的高度。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#Y1, #Y2, #Y3</code>：柜体内部三块活动层板各自的绝对标高（Z轴高度，单位 mm）。
              <br />
              • <code>mean([...])</code>：数学算术平均值公式，即 <code>(Y1 + Y2 + Y3) / 3</code>。
              <br />
              • 适用场景：美学对齐、多点挂件中心定位、非均匀层板群的视觉平衡锚点计算。
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
            borderLeft: '4px solid #8b5cf6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：对称均匀分布的三层隔板</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 真实标高：<code>Y1 = 400mm</code>，<code>Y2 = 800mm</code>，<code>Y3 = 1200mm</code>
                <br />
                • 计算过程：<code>(400 + 800 + 1200) / 3 = 2400 / 3 = 800mm</code>
                <br />
                • 结果中心：<strong>800mm</strong>
                <br />
                • 价值：准确落在中间层板位置，拉手中心与中层板自然重合，视觉极其规整。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：高低错落的展示柜格架</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 真实标高：<code>Y1 = 300mm（矮格）</code>，<code>Y2 = 650mm</code>，<code>Y3 = 1450mm（高展位）</code>
                <br />
                • 计算过程：<code>(300 + 650 + 1450) / 3 = 2400 / 3 = 800mm</code>
                <br />
                • 结果中心：<strong>800mm</strong>
                <br />
                • 价值：自动找到三者加权物理中心，即使内部层格错落自由调节，外挂门拉手或灯具依旧稳稳保持在正中央平衡点。
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #8b5cf6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>多个错位活动层板的算术平均对齐；</li>
                <li>多点挂载五金的几何中心求取；</li>
                <li>对称排版与美学居中布局。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #c4b5fd',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              快速计算多个构件或参考基准面的算术重心，实现智能排版与视觉平衡。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#8b5cf6',
                background: '#8b5cf60d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：参差层板一键回归黄金重心（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
