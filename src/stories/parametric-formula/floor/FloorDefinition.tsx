import React from 'react';

export interface FloorDefinitionProps {}

export const FloorDefinition: React.FC<FloorDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #3b82f60f 0%, #60a5fa1a 100%)',
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
          floor(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #60a5fa60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#3b82f6',
            boxShadow: '0 4px 12px -2px #3b82f615',
          }}
        >
          floor(#NetH / 200)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#3b82f6' }} />
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
              color: '#3b82f6',
              marginBottom: '16px',
            }}
          >
            floor(#NetH / 200)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“向下抹零头取整。只留放得下的完整件数，宁少勿多，绝不顶破柜子。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#NetH</code>：柜内净可用高度（例如 <code>720mm</code>）。
              <br />
              • <code>200</code>：每个标准抽屉或隔层所需的最小模块高度（<code>200mm/个</code>）。
              <br />
              • <code>floor(...)</code>：向下取整函数。比如除出来是 <code>3.6 个</code>，只能装下 3 个完整抽屉，剩下的 0.6 个高度必须舍去作为顶部活动间隙。
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
            borderLeft: '4px solid #3b82f6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 1：净高 720mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>720 / 200 = 3.6</code>
                <br />
                • 取整：<code>floor(3.6) = 3</code>
                <br />
                • 结果：安全生成 <strong>3 个</strong>抽屉（占用 600mm），余下 120mm 保证抽屉拉出时不蹭顶封板。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 2：净高 790mm（即便接近 4 个）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>790 / 200 = 3.95</code>
                <br />
                • 取整：<code>floor(3.95) = 3</code>
                <br />
                • 结果：坚决只装 <strong>3 个</strong>！如果四舍五入装 4 个（需 800mm），柜子直接爆框安装失败。
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
              borderTop: '4px solid #3b82f6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>抽屉数量防卡死排布</strong>：确保叠装抽屉不会超出物理空间；</li>
              <li><strong>红酒格/蜂窝格阵列算量</strong>：有限宽度内最多能嵌几列标准隔板；</li>
              <li><strong>装箱码垛限高校验</strong>：整车/电梯限高下能放几层标准货件。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #60a5fa',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              在硬性包络线内做减法，确保机械构件拥有安全安装公差，杜绝现场“差 5 毫米塞不进去”的返工惨剧。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#3b82f6',
                background: '#3b82f60d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：下地柜抽屉防顶爆安全算量（可在左侧切换进入【2. 3D 故事与交互演练】拉动 netH 观察抽屉增减）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
