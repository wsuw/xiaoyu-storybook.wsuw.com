import React from 'react';

export interface ComparisonsDefinitionProps {}

export const ComparisonsDefinition: React.FC<ComparisonsDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #64748b0f 0%, #94a3b81a 100%)',
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
          {"比较运算符 (<, >, <=, >=)"}
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #94a3b860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#64748b',
            boxShadow: '0 4px 12px -2px #64748b15',
          }}
        >
          {"if(#W <= 550, 15, 30)"}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#64748b' }} />
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
              color: '#64748b',
              marginBottom: '16px',
            }}
          >
            {"if(#W <= 550, 15, 30)"}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“大小比较运算符（&gt;、&lt;、&gt;=、&lt;=）：如果空间开间宽度紧凑（小于等于550mm），收口条压缩为15mm极窄条；若空间开间宽裕，则使用30mm标准封边条预留足够的靠墙打胶与找平空间。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#W</code>：现场实际测量的预留净开间尺寸（毫米）。
              <br />
              • <code>&lt;= 550</code>：小于等于比较操作符。用于判断数值是否在上限门槛之内。
              <br />
              • <code>15, 30</code>：当满足 <code>&lt;= 550</code> 时返回 15mm 极窄收口条，否则返回 30mm 充裕标准收口条。
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
            borderLeft: '4px solid #64748b',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：开间宽度 W = 480mm（小户型夹缝空间）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较判断：<code>480 &lt;= 550</code> 结果为 <strong>真（True）</strong>
                <br />
                • 计算收口宽度：<strong>15mm</strong>
                <br />
                • 价值：给柜内争取最大储物净宽，避免宽收口条侵占本就狭窄的抽屉拉篮空间。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：开间宽度 W = 550mm（正好处于阈值临界点）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较判断：<code>550 &lt;= 550</code> 因为包含等于号，结果为 <strong>真（True）</strong>
                <br />
                • 计算收口宽度：<strong>15mm</strong>
                <br />
                • 价值：边界数值精准覆盖，避免出现未定义的悬空状态。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：开间宽度 W = 800mm（大开间主卧靠墙）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较判断：<code>800 &lt;= 550</code> 结果为 <strong>假（False）</strong>
                <br />
                • 计算收口宽度：<strong>30mm</strong>
                <br />
                • 价值：采用标准 30mm 调节余量，便于现场安装师傅修切找平不平整的墙面。
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
              borderTop: '4px solid #64748b',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>紧凑户型避碰安装检修空间尺寸预留；</li>
                <li>电梯运输尺寸极值校验；</li>
                <li>现场安装间隙收口条动态计算。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #94a3b8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              对空间尺寸建立硬性上下限，确保家具不仅美观，更能实际运抵现场并顺利安装。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#64748b',
                background: '#64748b0d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：卫生间马桶侧边填缝条自适应（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
