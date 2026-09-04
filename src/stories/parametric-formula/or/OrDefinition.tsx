import React from 'react';

export interface OrDefinitionProps {}

export const OrDefinition: React.FC<OrDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #ea580c0f 0%, #fb923c1a 100%)',
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
          条件1 or 条件2
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fb923c60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ea580c',
            boxShadow: '0 4px 12px -2px #ea580c15',
          }}
        >
          {"if(#H > 2400 or #W > 800, 25, 18)"}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#ea580c' }} />
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
              color: '#ea580c',
              marginBottom: '16px',
            }}
          >
            {"if(#H > 2400 or #W > 800, 25, 18)"}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“或条件（满足任意一个就触发）：柜体只要高度超过2.4米，或者宽度超过0.8米，任何一项超标就必须将板材厚度升级为25mm重载厚板，否则维持18mm常规板。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#H &gt; 2400</code>：高度超标检查。超高门板或侧板长条极易受自重和应力弯曲。
              <br />
              • <code>or</code>：逻辑或连接词。前后条件只要有一个成立（为真），整个判断就成立。
              <br />
              • <code>#W &gt; 800</code>：宽度超标检查。跨度过宽容易承重下陷变形。
              <br />
              • <code>25, 18</code>：若满足任一超标则采用 25mm 加厚板抗弯；若两者均未超标，采用标准 18mm 板材。
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
            borderLeft: '4px solid #ea580c',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：高 2700mm，宽 600mm（超高一门到顶）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>2700 &gt; 2400 (真)</code>，宽 600 未超标
                <br />
                • or 计算：<strong>真（True，只要有一项超标）</strong>
                <br />
                • 结果板厚：<strong>25mm</strong>。防止超高板材日后弯曲拱起，自动升级。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：高 2000mm，宽 900mm（超宽地柜/书柜）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：高未超标，但 <code>900 &gt; 800 (真)</code>
                <br />
                • or 计算：<strong>真（True）</strong>
                <br />
                • 结果板厚：<strong>25mm</strong>。宽跨度受重力极易塌腰，自动加厚。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：高 2100mm，宽 600mm（常规标准柜）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>2100 &gt; 2400 (假)</code> 且 <code>600 &gt; 800 (假)</code>
                <br />
                • or 计算：<strong>假（False，两项都不超标）</strong>
                <br />
                • 结果板厚：<strong>18mm</strong>。经济适用，无需额外加厚增加成本。
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
              borderTop: '4px solid #ea580c',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>任一维度超标（超高、超宽）自动升级板厚；</li>
                <li>杜绝单项指标忽视带来的变形风险；</li>
                <li>自动化品控拦截。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #fb923c',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              设置多重安全阈值。任意单一指标超标即可触发防护机制，防止设计出缺陷产品。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#ea580c',
                background: '#ea580c0d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：超高或超宽的侧板厚度升级（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
