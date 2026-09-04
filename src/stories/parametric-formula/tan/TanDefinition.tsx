import React from 'react';

export interface TanDefinitionProps {}

export const TanDefinition: React.FC<TanDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #f973160f 0%, #fdba741a 100%)',
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
          tan(θ)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fdba7460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f97316',
            boxShadow: '0 4px 12px -2px #f9731615',
          }}
        >
          ΔH = #Depth * tan(#RoofAngle)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#f97316' }} />
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
              color: '#f97316',
              marginBottom: '16px',
            }}
          >
            ΔH = #Depth * tan(#RoofAngle)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“正切函数求斜顶下坠落差（阁楼斜屋顶定制裁切）：顶楼房间天花板是斜的，柜子如果进深做到 600mm，靠后墙的柜顶比靠前面的柜顶高出多少？用 ΔH = 进深 × tan(屋顶坡度角) 就能准确算出这一段高度落差，CNC 自动斜切侧板，严丝合缝贴死屋顶。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#Depth</code>：柜体进深厚度（底边直角边，单位 mm）。
              <br />
              • <code>#RoofAngle</code>：实测的建筑斜屋顶倾角（例如 30°、45°）。
              <br />
              • <code>tan(#RoofAngle)</code>：正切三角函数，代表直角三角形的对边比邻边比率。
              <br />
              • <code>ΔH (DeltaH)</code>：侧板前后两侧的高差切削量（对边高度，单位 mm）。
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
            borderLeft: '4px solid #f97316',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：标准 30° 缓坡阁楼，进深 600mm 大衣柜</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 三角函数值：<code>tan(30°) ≈ 0.577</code>
                <br />
                • 计算切角高差：<code>ΔH = 600 × 0.577 ≈ 346.4mm</code>
                <br />
                • 下料加工：设柜体靠前外沿高度为 2000mm，则靠墙内侧高度自动定为 <code>2000 + 346.4 = 2346.4mm</code>。
                <br />
                • 效果：侧板数控斜锯切一刀成型，完美顶死斜坡顶，不积灰不露缝。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：陡峭 45° 人字形顶，进深 400mm 矮书柜</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 三角函数值：<code>tan(45°) = 1.0</code>（等腰直角三角关系）
                <br />
                • 计算切角高差：<code>ΔH = 400 × 1.0 = 400mm</code>
                <br />
                • 下料加工：进深多少，前后落差就正好是多少（400mm）。
                <br />
                • 效果：免去现场木工手动墨线放样和手提锯反复比对修切，生产端直接五轴数控成型。
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
              borderTop: '4px solid #f97316',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>斜顶、不规则阁楼房间定制裁切；</li>
                <li>按倾角反求高度差与下料削顶斜边；</li>
                <li>自适应贴合非正交建筑轮廓。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #fdba74',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              通过斜率正切比率，把平面倾角投射为垂直高度差，实现异形倾斜空间的精准裁切。
            </p
            >
            <div
              style={{
                fontSize: '13px',
                color: '#f97316',
                background: '#f973160d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：斜顶阁楼衣柜的严丝合缝贴角（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
