import React from 'react';

export interface EqNeqDefinitionProps {}

export const EqNeqDefinition: React.FC<EqNeqDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #ec48990f 0%, #f472b61a 100%)',
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
          == (等于) / != (不等于)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f472b660',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ec4899',
            boxShadow: '0 4px 12px -2px #ec489915',
          }}
        >
          #HasDoor == 1
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#ec4899' }} />
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
              color: '#ec4899',
              marginBottom: '16px',
            }}
          >
            #HasDoor == 1
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“柜门显隐开关：#HasDoor == 1 成立时，安上整扇防尘柜门与五金拉手；当等于 0（即 #HasDoor != 1）时，一键卸下柜门，切换为清爽通透的开放展示格！”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#HasDoor</code>：柜门显隐状态布尔值（1 代表带门封闭柜，0 代表无门开放格）。
              <br />
              • <code>== 1</code>：恒等等于判断。当且仅当等于 1 时为真（True），生成掩门及合页；否则不生成。
              <br />
              • <code>!= 1</code>：不等于判断（如 <code>#HasDoor != 1</code> 用于判断开放格时，自动生成层板内缩封边与背板美化工艺）。
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
            borderLeft: '4px solid #ec4899',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：用户选配 #HasDoor = 1（掩门封闭柜）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 等式判断：<code>1 == 1</code> 结果为 <strong>真（True）</strong>
                <br />
                • 模型动作：生成外掩柜门、金色极简五金拉手及阻尼铰链孔位。
                <br />
                • 空间体验：防尘私密、立面平整统一，适合衣物存放。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：用户选配 #HasDoor = 0（开放式展示格）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 等式判断：<code>0 == 1</code> 结果为 <strong>假（False，即 #HasDoor != 1）</strong>
                <br />
                • 模型动作：隐去门板，展示柜内多层活动隔板，方便拿取。
                <br />
                • 空间体验：通透开阔，适合做书架、摆件展示与随手置物。
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
              borderTop: '4px solid #ec4899',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li><strong>形态开关控制</strong>：一键在“开放柜”与“掩门柜”之间无缝切换；</li>
                <li><strong>下料清单动态增减</strong>：门板、铰链、拉手根据开关决定是否加入采购料单；</li>
                <li><strong>同体双形态复用</strong>：同一套柜体外框模型，无需画两遍即可覆盖有门/无门两种方案。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #f472b6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              <code>==</code> 与 <code>!=</code> 是参数化设计中最直白、最容易记住的布尔型“零件显隐闸门”。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#ec4899',
                background: '#ec48990d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：开放格与带门柜一键切换（可在左侧切换进入【2. 3D 故事与交互演练】切换开关体验柜门显隐）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
