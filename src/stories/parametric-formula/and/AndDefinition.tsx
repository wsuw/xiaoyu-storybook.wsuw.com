import React from 'react';

export interface AndDefinitionProps {}

export const AndDefinition: React.FC<AndDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #f59e0b0f 0%, #fbbf241a 100%)',
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
          条件1 and 条件2
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fbbf2460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f59e0b',
            boxShadow: '0 4px 12px -2px #f59e0b15',
          }}
        >
          {"#W > 600 and #D > 380"}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#f59e0b' }} />
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
              color: '#f59e0b',
              marginBottom: '16px',
            }}
          >
            {"#W > 600 and #D > 380"}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“且条件（两个必须同时满足）：只有当宽度既大于600，且深度又大于380时，才判定存在严重下垂风险，自动插入防塌中立柱。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#W &gt; 600</code>：大跨度条件。跨度大容易导致层板中央下弯。
              <br />
              • <code>and</code>：逻辑与连接词。前后两项必须同时为真才判定为真。
              <br />
              • <code>#D &gt; 380</code>：深进深条件。如果只是宽但很浅（如鞋架放几双鞋），自重和承重其实不大；但如果又深又宽，堆满大厚书时下弯力矩剧增。
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
            borderLeft: '4px solid #f59e0b',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：宽 700mm，但深度仅 300mm（浅书架）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>700 &gt; 600 (真)</code> 但 <code>300 &gt; 380 (假)</code>
                <br />
                • and 计算：<strong>假（False）</strong>
                <br />
                • 结果：<strong>不加立柱</strong>，保持柜体内部空间大通透，不增加不必要构件。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：宽 750mm，深度 420mm（深重大书架）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>750 &gt; 600 (真)</code> 且 <code>420 &gt; 380 (真)</code>
                <br />
                • and 计算：<strong>真（True）</strong>
                <br />
                • 结果：<strong>触发预警并自动加装中央加固立柱</strong>，彻底消除日后层板被压塌风险！
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
              borderTop: '4px solid #f59e0b',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>多维组合危险校验</strong>：如“超宽且超高”强制加天地螺杆防倾倒；</li>
              <li><strong>精密安装干涉规避</strong>：“门宽&gt;500且内藏滑轨”时强制要求加防尘条；</li>
              <li><strong>精确保护工艺</strong>：不误伤普通轻量场景，只在真正高风险时介入。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #fbbf24',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              实现严谨的交集逻辑。只有在多项结构风险同时存在时才介入加固构件，既保障美观通透，又守住安全底线。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#f59e0b',
                background: '#f59e0b0d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：大跨度超深书架与中央防弯立柱（可在左侧切换进入【2. 3D 故事与交互演练】同时调整 w 和 d 体验联动）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
