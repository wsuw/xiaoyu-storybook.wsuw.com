import React from 'react';

export interface TrimAvgDefinitionProps {}

export const TrimAvgDefinition: React.FC<TrimAvgDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #d946ef0f 0%, #f0abfc1a 100%)',
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
          trimavg(#W, #W1, #W2, ...)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f0abfc60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#d946ef',
            boxShadow: '0 4px 12px -2px #d946ef15',
          }}
        >
          trimavg(#TotalW, #W1, #W2, #W3)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#d946ef' }} />
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
              color: '#d946ef',
              marginBottom: '16px',
            }}
          >
            trimavg(#TotalW, #W1, #W2, #W3)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“扣除固定模块后均分余量：总宽度里可能包含部分固定死了尺寸的专有功能格（如大衣长挂衣区600mm、保险箱格400mm），trimavg 先把这些固定死的值扣除，剩下的可用空间自动平摊均分给其它几个活动收纳仓。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#TotalW</code>：柜体内部总开间净宽（单位 mm）。
              <br />
              • <code>#W1, #W2, #W3</code>：各个子格位设定的宽度。其中若指定了固定尺寸则先行扣减；未固定的仓位则均分剩余净宽。
              <br />
              • 计算逻辑：<code>(TotalW - ∑固定宽度) / 未锁定仓位数量</code>。
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
            borderLeft: '4px solid #d946ef',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：总宽 2400mm 大衣柜，锁定 1 个 800mm 长衣区</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 已知条件：<code>TotalW = 2400mm</code>，W1 固定为 <code>800mm</code>，其余 W2、W3 两个叠衣格待均分
                <br />
                • 计算扣除：剩余宽度 = <code>2400 - 800 = 1600mm</code>
                <br />
                • 均分计算：<code>1600 / 2 = 800mm</code>
                <br />
                • 结果：W2 = 800mm，W3 = 800mm。三门正好完全对称等宽！
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：客户压缩总宽至 2000mm（户型变窄）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 已知条件：<code>TotalW = 2000mm</code>，W1 仍强锁定 <code>800mm</code>（保证长风衣挂衣量）
                <br />
                • 计算扣除：剩余可用空间 = <code>2000 - 800 = 1200mm</code>
                <br />
                • 均分计算：<code>1200 / 2 = 600mm</code>
                <br />
                • 结果：W2 与 W3 自动弹性缩减为各 600mm，既保证核心功能区不变，又实现整柜无缝塞满墙体。
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
              borderTop: '4px solid #d946ef',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>局部固定尺寸锁定，剩余空间自适应均分；</li>
                <li>多门衣柜中混合特定收纳格；</li>
                <li>复合公式专属空间自适应重调。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #f0abfc',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              智能过滤用户手动指定的常数项，仅对未锁定的自由变量执行空间再分配。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#d946ef',
                background: '#d946ef0d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：风衣专区锁定与剩余格子自适应（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
