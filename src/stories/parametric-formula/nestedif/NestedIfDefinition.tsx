import React from 'react';

export interface NestedIfDefinitionProps {}

export const NestedIfDefinition: React.FC<NestedIfDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #8b5cf60f 0%, #a78bfa1a 100%)',
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
          nestedif(...)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a78bfa60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#8b5cf6',
            boxShadow: '0 4px 12px -2px #8b5cf615',
          }}
        >
          {"nestedif(#D<=350, 250, #D<=400, 300, 350)"}
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
            {"nestedif(#D<=350, 250, #D<=400, 300, 350)"}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“阶梯多档匹配：超浅柜配250滑轨，中深配300滑轨，更深配350滑轨。一行公式搞定多级分档，不用写一堆乱七八糟的嵌套括号。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析（成对判断，最后是保底默认值）：</strong>
              <br />
              • <code>#D &lt;= 350, 250</code>：第一档。如果柜深 ≤ 350mm，选配 250mm 迷你滑轨/托架。
              <br />
              • <code>#D &lt;= 400, 300</code>：第二档。否则如果柜深 ≤ 400mm，选配 300mm 标准滑轨。
              <br />
              • <code>350</code>：保底兜底值。都不满足（说明柜深 &gt; 400mm），直接选配 350mm 加长深滑轨。
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
            🔢 直观计算举例（三档阶梯实测）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 1：柜深 330mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 命中：<code>330 &lt;= 350</code>
                <br />
                • 结果：选用 <strong>250mm</strong> 迷你滑轨，紧凑防碰背板。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 2：柜深 380mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 命中：<code>380 &lt;= 400</code>
                <br />
                • 结果：选用 <strong>300mm</strong> 中型滑轨，稳定承重。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 3：柜深 500mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 走入默认：<code>&gt; 400mm</code>
                <br />
                • 结果：自动采用 <strong>350mm</strong> 满格大滑轨，抽拉行程更长。
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
              borderTop: '4px solid #8b5cf6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>五金多规格阶梯换型</strong>：滑轨长短、铰链阻尼力矩（轻/中/重载）阶梯映射；</li>
              <li><strong>多层阶梯价格规则匹配</strong>：按投影面积或深度阶梯自动归入对应的生产料工费标准；</li>
              <li><strong>消除嵌套括号地狱</strong>：传统代码需要 <code>if(..., if(..., if(...)))</code>，用 <code>nestedif</code> 平铺易读易改。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #a78bfa',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              直观表达现实制造业中典型的“阶梯型标准件选配规则”，配置清晰明了，便于企业产研与工艺库长效维护。
            </p>
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
              ✦ 场景示范：铰链阻尼三档无缝适配（可在左侧切换进入【2. 3D 故事与交互演练】拖动 d 深度观察三个阶梯的跳变）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
