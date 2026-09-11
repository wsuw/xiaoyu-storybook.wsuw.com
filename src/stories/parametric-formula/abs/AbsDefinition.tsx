import React from 'react';

export interface AbsDefinitionProps {}

export const AbsDefinition: React.FC<AbsDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #84cc160f 0%, #a3e6351a 100%)',
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
          abs(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a3e63560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#65a30d',
            boxShadow: '0 4px 12px -2px #84cc1615',
          }}
        >
          #Overhang = abs(#DeskOffset)
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        {/* 1. 公式标准原型与直白通俗解释 */}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#84cc16' }} />
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
              color: '#65a30d',
              marginBottom: '16px',
            }}
          >
            #Overhang = abs(#DeskOffset)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“不管是向左延伸（靠飘窗）还是向右延伸（靠床头），悬空桌板伸出柜体支撑的物理净跨度永远取正绝对值。只要悬挑跨度超过 200mm，系统自动在桌板底部嵌入重载冷轧工字钢承重龙骨，并铺设 3000K 悬浮洗墙线性氛围灯带。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#DeskOffset</code>：桌板相对于主柜体侧边的相对延伸偏移量（往左伸为负数如 <code>-350mm</code>，往右伸为正数如 <code>+350mm</code>）。
              <br />
              • <code>abs(...)</code>：绝对值函数。剔除正负符号，把负数直接取正（<code>abs(-350) = 350</code>），得到真正的物理悬空跨度。
              <br />
              • <code>#Overhang</code>：悬挑净跨度（毫米），用于力学抗弯校核、承重钢梁下料与氛围灯带配线。
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
            borderLeft: '4px solid #84cc16',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：向左靠窗悬挑 350mm（负偏移）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 布局坐标：<code>#DeskOffset = -350mm</code>
                <br />
                • abs 计算：<code>abs(-350) = 350mm</code>
                <br />
                • 联动动作：<strong>悬挑 350mm &gt; 200mm</strong>，自动加装 350mm 嵌入式工字承重钢梁 + 3000K 悬浮洗墙暖光灯带！
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：向右靠床悬挑 350mm（正偏移）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 布局坐标：<code>#DeskOffset = +350mm</code>
                <br />
                • abs 计算：<code>abs(+350) = 350mm</code>
                <br />
                • 联动动作：同样取得正向 <strong>350mm 净跨度</strong>，生成同等规格加固工字钢与灯带，对称工艺无缝复用！
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：桌板与柜侧齐平（无悬挑）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 布局坐标：<code>#DeskOffset = 0mm</code>
                <br />
                • abs 计算：<code>abs(0) = 0mm</code>
                <br />
                • 联动动作：无悬挑跨度，保持基础木板连接自承重，无需额外金属工字钢。
              </div>
            </div>
          </div>
        </div>

        {/* 3. 应用场景与工程价值 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #84cc16',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式在全屋定制中用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>悬空悬挑结构力学安全</strong>：无论向左伸还是向右伸，自动校核悬臂梁倾覆弯矩；</li>
              <li><strong>消除坐标正负号干扰</strong>：三维建模中方向用正负表示，而材料下料与五金采购只认绝对正数尺寸；</li>
              <li><strong>提升高定设计感</strong>：悬挑越大，越需要悬浮灯带与隐形钢梁咬合，科技感与颜值拉满。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #a3e635',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              <code>abs</code> 抹平了空间方向对力学标量的干扰。它确保了悬挑书桌、梳妆台、中岛悬空吧台等高定造型，无论如何灵活适配户型朝向，力学安全结构都能 100% 自动精确介入。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#65a30d',
                background: '#84cc160d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：衣柜一体化悬空书桌双向悬挑（可在 3D 演练中左右滑动偏移量，查看承重钢梁与灯带动效）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
