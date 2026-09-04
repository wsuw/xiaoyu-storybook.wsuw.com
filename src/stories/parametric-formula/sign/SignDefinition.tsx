import React from 'react';

export interface SignDefinitionProps {}

export const SignDefinition: React.FC<SignDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #6366f10f 0%, #a5b4fc1a 100%)',
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
          sign(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a5b4fc60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#6366f1',
            boxShadow: '0 4px 12px -2px #6366f115',
          }}
        >
          sign(#MoveOffset)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#6366f1' }} />
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
              color: '#6366f1',
              marginBottom: '16px',
            }}
          >
            sign(#MoveOffset)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“提取正负符号（仅关心朝哪边动）：不管位移量是 50mm 还是 300mm，只提取出移动的方向（往右正向为 +1，往左反向为 -1，静止为 0）。用于反向给推拉门施加阻尼缓冲器的安装受力朝向。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#MoveOffset</code>：物体或构件沿某一轴向的实时物理位移偏移量（正数代表向右/向上，负数代表向左/向下，单位 mm）。
              <br />
              • <code>sign(x)</code> 数学定义：
              <br />
              &nbsp;&nbsp;• 若 <code>x &gt; 0</code>，返回 <strong>+1</strong>（正向运动）；
              <br />
              &nbsp;&nbsp;• 若 <code>x &lt; 0</code>，返回 <strong>-1</strong>（反向运动）；
              <br />
              &nbsp;&nbsp;• 若 <code>x == 0</code>，返回 <strong>0</strong>（静止无运动）。
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
            borderLeft: '4px solid #6366f1',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：向右推门，位移 +180mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>sign(180)</code> = <strong>+1</strong>
                <br />
                • 力学应用：右侧防撞阻尼生效方向为 <code>-1 * sign(+180) = -1</code>（产生向左的阻滞减速阻尼力）。
                <br />
                • 模型动作：右侧液压缓冲活塞收缩吸收动能，避免门扇猛烈撞击右侧立柱。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：向左推门，位移 -250mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>sign(-250)</code> = <strong>-1</strong>
                <br />
                • 力学应用：左侧防撞阻尼生效方向为 <code>-1 * sign(-250) = +1</code>（产生向右的拉力）。
                <br />
                • 模型动作：激活左侧缓冲件，左端防跳轮扣紧轨道凹槽。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：推拉门复位静止，位移 0mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 计算：<code>sign(0)</code> = <strong>0</strong>
                <br />
                • 力学应用：缓冲阻力系数为 <code>0 N</code>。
                <br />
                • 模型动作：阻尼件与复位弹簧处于自然松弛待命状态，无任何额外形变阻力。
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
              borderTop: '4px solid #6366f1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>提取滑动方向（+1 或 -1）；</li>
                <li>反向驱动防撞阻尼器与缓冲力向量；</li>
                <li>双向推拉机构的状态判别。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #a5b4fc',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              无视位移大小，瞬间解析出物体的朝向与运动趋势，专门用于机械反作用力与方向指示。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#6366f1',
                background: '#6366f10d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：双向移门阻尼缓冲器的逆向弹力（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
