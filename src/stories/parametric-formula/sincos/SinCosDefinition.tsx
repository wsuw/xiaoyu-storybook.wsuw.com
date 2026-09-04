import React from 'react';

export interface SinCosDefinitionProps {}

export const SinCosDefinition: React.FC<SinCosDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #f43f5e0f 0%, #fb71851a 100%)',
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
          sin(θ) 与 cos(θ)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fb718560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f43f5e',
            boxShadow: '0 4px 12px -2px #f43f5e15',
          }}
        >
          X = R*cos(θ), Z = R*sin(θ)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#f43f5e' }} />
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
              color: '#f43f5e',
              marginBottom: '16px',
            }}
          >
            X = R*cos(θ), Z = R*sin(θ)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“正弦余弦求圆周旋转轨迹（让物体转起来）：橱柜转角的小怪物飞碟转盘，随着旋转角度 θ 的变化，托盘的实时前后和左右位置就是靠 X = R·cos(θ) 和 Z = R·sin(θ) 精准算出，保证转盘沿着完美的圆形弧线滑出柜外。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>R</code>：旋转臂或圆盘转动半径（单位 mm）。
              <br />
              • <code>θ (theta)</code>：当前旋转角度（如从 0° 旋转到 90°）。
              <br />
              • <code>cos(θ)</code>：控制水平 X 轴偏移（左右位移）。
              <br />
              • <code>sin(θ)</code>：控制垂直进深 Z 轴偏移（前后滑出深度）。
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
            borderLeft: '4px solid #f43f5e',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>阶段 1：初始闭合（旋转角度 θ = 0°）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 设旋转半径 R = 350mm
                <br />
                • 计算：<code>cos(0°) = 1</code>，<code>sin(0°) = 0</code>
                <br />
                • 坐标定位：<code>X = 350mm</code>，<code>Z = 0mm</code>
                <br />
                • 状态：转盘完全收纳于地柜深处，不凸出门缝。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>阶段 2：旋出中途（旋转角度 θ = 45°）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>cos(45°) ≈ 0.707</code>，<code>sin(45°) ≈ 0.707</code>
                <br />
                • 坐标定位：<code>X = 350 × 0.707 ≈ 247.5mm</code>，<code>Z = 247.5mm</code>
                <br />
                • 状态：转盘托着调料罐优雅滑行在拐角对角线上，避开柜门边框碰撞。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>阶段 3：完全转出（旋转角度 θ = 90°）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>cos(90°) = 0</code>，<code>sin(90°) = 1</code>
                <br />
                • 坐标定位：<code>X = 0mm</code>，<code>Z = 350mm</code>
                <br />
                • 状态：转盘全行程拉出柜外 350mm，物品一览无余，触手可及。
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
              borderTop: '4px solid #f43f5e',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>转角转篮、飞碟托盘圆周运动；</li>
                <li>弧形旋转门及导轨跟随；</li>
                <li>极坐标向空间笛卡尔三维坐标转换。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #fb7185',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              利用三角函数构建三维空间内的圆弧与旋转轨迹，驱动旋转门与五金机构动态模拟。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#f43f5e',
                background: '#f43f5e0d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：转角地柜飞碟转篮的丝滑盘旋（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
