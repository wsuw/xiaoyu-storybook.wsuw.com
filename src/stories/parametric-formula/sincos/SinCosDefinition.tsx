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
              <strong>通俗一句话：</strong> <strong>“正弦余弦求圆周旋转轨迹（让家装门扇转起来）：现代极简满墙木饰面隐形门，随着开门角度 θ 的推开变化，门扇最外边缘在空间的实时前后进深和左右开合宽度就是靠 X = W·cos(θ) 和 Z = W·sin(θ) 精准算出，实时绘制门扇扫过的回转圆弧与安全扇区，防止撞坏后方家具与踢脚线。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>W</code>：门扇物理宽度（即开门回转半径，如标准大单门 <code>860mm</code>）。
              <br />
              • <code>θ (theta)</code>：当前开门角度（从 0° 完全闭合推开至 90° 完全展开）。
              <br />
              • <code>cos(θ)</code>：控制横向开间占用（X 轴门扇横向宽度投影）。
              <br />
              • <code>sin(θ)</code>：控制纵向进深扫入深度（Z 轴开门空间探出占用）。
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
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>阶段 1：绝对隐形闭合（开门角度 θ = 0°）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 门宽 W = 860mm
                <br />
                • 计算：<code>cos(0°) = 1</code>，<code>sin(0°) = 0</code>
                <br />
                • 空间定位：<code>X = 860mm</code>，<code>Z = 0mm</code>
                <br />
                • 状态：门扇完全平齐嵌入背景木饰面护墙板，严丝合缝，空间极简通透。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>阶段 2：半开通行中途（开门角度 θ = 45°）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>cos(45°) ≈ 0.707</code>，<code>sin(45°) ≈ 0.707</code>
                <br />
                • 空间定位：<code>X ≈ 608mm</code>，<code>Z ≈ 608mm</code>
                <br />
                • 状态：门扇推开至 45°，实时推演地面圆弧轨迹，避免碰触侧方开关插座与花盆。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>阶段 3：完全敞开通行（开门角度 θ = 90°）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>cos(90°) = 0</code>，<code>sin(90°) = 1</code>
                <br />
                • 空间定位：<code>X = 0mm</code>，<code>Z = 860mm</code>
                <br />
                • 状态：横向门洞净开间 860mm 100% 释放，后方书房主卧畅行无阻。
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
                <li>玄关旋转鞋架镜柱、悬臂旋转电视柱回转半径校核；</li>
                <li>隐形门、折叠平开门开合轨迹防撞包络线推演；</li>
                <li>极坐标向三维空间笛卡尔物理坐标系统转换。</li>
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
              💡 家装设计与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              利用三角函数将旋转角度转化为空间物理坐标，用于家装动态旋转家具的无干涉运动模拟与空间避让。
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
              ✦ 场景示范：意式玄关 360°旋转全身镜鞋架与避碰回转包络线（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
