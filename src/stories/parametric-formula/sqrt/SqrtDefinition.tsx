import React from 'react';

export interface SqrtDefinitionProps {}

export const SqrtDefinition: React.FC<SqrtDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #10b9810f 0%, #6ee7b71a 100%)',
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
          sqrt(x)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #6ee7b760',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#10b981',
            boxShadow: '0 4px 12px -2px #10b98115',
          }}
        >
          sqrt(#W*#W + #H*#H)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#10b981' }} />
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
              color: '#10b981',
              marginBottom: '16px',
            }}
          >
            sqrt(#W*#W + #H*#H)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“开平方根（直角三角形勾股定理求斜边）：柜体背部为了防止左右晃动要安装一根金属交叉斜拉杆，拉杆的实际切割长度正是直角三角形的斜边，用 sqrt(宽² + 高²) 就能一步算出精准下料尺寸。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#W</code>：柜体背格宽度（单位 mm，直角边 a）。
              <br />
              • <code>#H</code>：柜体背格高度（单位 mm，直角边 b）。
              <br />
              • <code>sqrt(a² + b²)</code>：勾股定理斜边公式 <code>c = √(a² + b²)</code>。
              <br />
              • 制造价值：杜绝人工用卷尺斜拉拉杆测量产生的积累误差，直接数控冲孔并下料金属圆管。
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
            borderLeft: '4px solid #10b981',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：经典比例背架（宽 800mm × 高 600mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 平方和：<code>800² + 600² = 640,000 + 360,000 = 1,000,000</code>
                <br />
                • 开根号：<code>sqrt(1,000,000) = 1000mm</code>
                <br />
                • 结果拉杆净长：<strong>1000mm</strong>
                <br />
                • 现场装配：对角两端螺丝孔位正好 1000mm 紧密锁入，柜身瞬间锁死呈 90 度刚性直角。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：大开间书架（宽 1200mm × 高 900mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 平方和：<code>1200² + 900² = 1,440,000 + 810,000 = 2,250,000</code>
                <br />
                • 开根号：<code>sqrt(2,250,000) = 1500mm</code>
                <br />
                • 结果拉杆净长：<strong>1500mm</strong>
                <br />
                • 联动输出：BIM 零件清单自动输出 1500mm 镀锌防锈拉杆 × 2根（交叉十字结构）。
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
              borderTop: '4px solid #10b981',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>矩形对角线交叉防晃拉杆精确长度计算；</li>
                <li>斜撑加固件根据宽、高动态生成；</li>
                <li>构件下料清单的勾股精准算料。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #6ee7b7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              计算欧氏对角线距离与三维模长，使对角线支撑件和空间连接杆能够自适应伸缩下料。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#10b981',
                background: '#10b9810d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：工业风金属背架对角防晃拉杆（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
