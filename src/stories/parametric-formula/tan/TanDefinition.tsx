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
            color: '#ea580c',
            boxShadow: '0 4px 12px -2px #f9731615',
          }}
        >
          ΔH = StepW * tan(θ)
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
              color: '#ea580c',
              marginBottom: '16px',
            }}
          >
            ΔH = StepW * tan(θ)  （即柜身总高度 H = L * tan(θ)）
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“正切函数求斜率与阶梯落差（复式/别墅楼梯下方黄金收纳柜）：楼梯底部是个斜三角废弃空间，想要严丝合缝做一组从矮到高的阶梯式抽屉与高柜，每一节柜子顶面该做多高？用 柜宽 StepW × tan(楼梯坡度角 θ) 就能算出每一级柜门的高度步进差 ΔH，实现与楼梯斜梁底面 0 缝隙贴合。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>StepW</code>：单组收纳柜/抽屉的进深或横向开间宽度（直角三角形底边，单位 mm）。
              <br />
              • <code>θ (theta)</code>：楼梯实际踏步倾斜坡度角（家装常见 <code>30° ~ 38°</code>）。
              <br />
              • <code>tan(θ)</code>：直角三角形的正切比值（对边比邻边，即单位宽度下的高度抬升率）。
              <br />
              • <code>ΔH (DeltaH)</code>：每递进一扇柜门时，柜顶沿着楼梯斜坡抬升的精确高度差（单位 mm）。
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
            🔢 直观计算举例（带入真实别墅楼梯尺寸）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：标准缓坡楼梯（坡度 θ = 30°，每组柜宽 450mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 正切值：<code>tan(30°) ≈ 0.577</code>
                <br />
                • 单门步进抬升：<code>ΔH = 450 × 0.577 ≈ 260mm</code>
                <br />
                • 阶梯分级高度：第1扇鞋抽高 <code>600mm</code>，第2扇高 <code>860mm</code>，第3扇挂衣柜高 <code>1120mm</code>，第4扇高大件杂物柜高 <code>1380mm</code>。
                <br />
                • 效果：所有门顶平齐贴合楼梯斜底，线条层层递进，秩序美感拉满。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：紧凑旋转复式楼梯（较陡坡度 θ = 36°，每组柜宽 400mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 正切值：<code>tan(36°) ≈ 0.727</code>
                <br />
                • 单门步进抬升：<code>ΔH = 400 × 0.727 ≈ 291mm</code>
                <br />
                • 制造联动：BIM 自动批量输出阶梯门板下料清单，无需现场量尺裁切。
                <br />
                • 效果：消除了楼梯下传统“死角”与积灰阴暗区，收纳容积直接倍增 3.5m³。
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
              <li>复式与跃层楼梯下方异形阶梯柜高度梯度自适应计算；</li>
              <li>阁楼斜顶、斜墙与楼梯斜梁的下切/台阶精准放样；</li>
              <li>无障碍斜坡踏步落差与防滑坡度比率推演。</li>
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
              <code>tan(θ)</code> 将建筑结构中的角度倾角转化为连续或阶梯式的垂直坐标差，是全屋定制消化所有“斜坡、斜角空间”的通用空间转换引擎。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#ea580c',
                background: '#f973160d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：复式别墅实木楼梯下阶梯式收纳组合柜（可在左侧切换进入【2. 3D 故事与交互演练】实时调节楼梯坡度查看柜体联动）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
