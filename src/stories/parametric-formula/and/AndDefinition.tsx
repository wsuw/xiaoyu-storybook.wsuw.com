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
          #H &gt;= 2400 and #W &gt;= 500
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
            #H &gt;= 2400 and #W &gt;= 500
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“且条件（两个条件必须同时满足）：只有当衣柜门板高度既大于等于2400mm，且宽度又大于等于500mm时，才判定存在弓形翘曲严重风险，自动在门背开槽预埋通顶拉直器，并将阻尼铰链由3个升级至5个。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#H &gt;= 2400</code>：超高门板条件。高定极简“一门到顶”高度通常在 2.4m~2.7m，垂直纵深大。
              <br />
              • <code>and</code>：逻辑与操作符。左右两边条件<strong>必须同时成立</strong>，整体结果才为真（True）；只要有一边不满足，结果即为假（False）。
              <br />
              • <code>#W &gt;= 500</code>：超宽门板条件。门板越宽，受力表面积与横向应力力矩成倍放大。
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：高 2600，宽 400（极窄高门）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>2600 &gt;= 2400 (真)</code> 但 <code>400 &gt;= 500 (假)</code>
                <br />
                • and 计算：<strong>假（False）</strong>
                <br />
                • 结果：<strong>不加拉直器，保持 3 铰链</strong>。虽然高，但很窄，木材纤维受力截面小不易翘，免开槽省工时。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：高 1800，宽 600（地柜矮阔门）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>1800 &gt;= 2400 (假)</code> 但 <code>600 &gt;= 500 (真)</code>
                <br />
                • and 计算：<strong>假（False）</strong>
                <br />
                • 结果：<strong>不加拉直器，保持 3 铰链</strong>。虽然宽，但门身短自重轻，完全在刚度安全范围内。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：高 2500，宽 550（超高大阔门）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>2500 &gt;= 2400 (真)</code> 且 <code>550 &gt;= 500 (真)</code>
                <br />
                • and 计算：<strong>真（True）双限齐破！</strong>
                <br />
                • 结果：<strong>必须开槽加装通顶香槟金金属拉直器 + 铰链增至 5 铰</strong>，坚决杜绝出厂后弓形变形！
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
              🎯 这个公式在全屋定制中用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>一门到顶高柜五金风控</strong>：精准识别危险大板，避免售后门缝关不拢退货；</li>
              <li><strong>铰链数量阶梯智能联动</strong>：由单薄的 3 铰链自动补强至 5 铰链均匀分担下垂拉力；</li>
              <li><strong>避免成本浪费</strong>：对未达风险红线的小门板绝不冗余开槽加装昂贵拉直器。</li>
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
              <code>and</code> 是严密的交集安全锁。它杜绝了任何“单点误判”，将力学工程风险与制造成本之间的博弈转化为精准的代码逻辑，守住高端品质底线。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#b45309',
                background: '#fef3c7',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ◆ 场景示范：一门到顶衣柜门板双限防翘曲（可在 3D 演练中单独滑动长宽体验）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
