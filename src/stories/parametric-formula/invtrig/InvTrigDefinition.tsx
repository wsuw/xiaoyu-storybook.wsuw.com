import React from 'react';

export interface InvTrigDefinitionProps {}

export const InvTrigDefinition: React.FC<InvTrigDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #eab3080f 0%, #fde0471a 100%)',
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
          asin / acos / atan (反三角函数)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fde04760',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#eab308',
            boxShadow: '0 4px 12px -2px #eab30815',
          }}
        >
          θ = asin(#LiftH / #ArmLength)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#eab308' }} />
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
              color: '#eab308',
              marginBottom: '16px',
            }}
          >
            θ = asin(#LiftH / #ArmLength)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“反三角函数反求机械臂旋转角（反向运动学 IK）：吊柜上翻门如果想停在离台面 200mm 的高度，气压支撑杆到底该旋转多少度？通过 θ = asin(抬升高度 / 摆臂长)，无需物理试凑，直接精准反算出机械臂所需要的旋转角度，驱动 3D 骨骼连杆机构。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#LiftH</code>：门板当前希望提升到达的竖向开门高度（对边，单位 mm）。
              <br />
              • <code>#ArmLength</code>：气撑杆或五金连杆支臂的固定物理长度（斜边，单位 mm）。
              <br />
              • <code>asin(对边 / 斜边)</code>：反正弦函数（ArcSine）。将高度比率转换为实际机械转角 θ（弧度或角度）。
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
            borderLeft: '4px solid #eab308',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：半开通风悬停（抬升 200mm，摆臂 400mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算比值：<code>200 / 400 = 0.5</code>
                <br />
                • 反求角度：<code>asin(0.5) = 30°</code>
                <br />
                • 机构姿态：支撑杆自动旋转 <strong>30 度</strong> 并在该角度激活内部液压随意停平衡阻尼，门扇悬停于半开状态。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：大开角取物（抬升 282.8mm，摆臂 400mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算比值：<code>282.8 / 400 ≈ 0.707</code>
                <br />
                • 反求角度：<code>asin(0.707) = 45°</code>
                <br />
                • 机构姿态：支撑臂旋转 <strong>45 度</strong>，门板斜向上翻起，柜内调味品毫无遮挡。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：极限最大开启（抬升 400mm，摆臂 400mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算比值：<code>400 / 400 = 1.0</code>
                <br />
                • 反求角度：<code>asin(1.0) = 90°</code>
                <br />
                • 机构姿态：支撑臂竖直拉满旋转 <strong>90 度</strong>，门扇水平高高托起，进入极限开启限位器锁定。
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
              borderTop: '4px solid #eab308',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>已知门板开启高度，反推气动撑杆旋转角度；</li>
                <li>空间连杆机构反向动力学（IK）解算；</li>
                <li>多自由度铰链位姿精确定位。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #fde047',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              在已知抬升位移或空间点坐标时，反向求解旋转关节的角度，实现高级五金机构的联动。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#eab308',
                background: '#eab3080d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：气撑上翻吊柜机械连杆逆向解算（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
