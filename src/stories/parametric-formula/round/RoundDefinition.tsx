import React from 'react';

export interface RoundDefinitionProps {}

export const RoundDefinition: React.FC<RoundDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #14b8a60f 0%, #5eead41a 100%)',
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
          round(#A, 2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #5eead460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#14b8a6',
            boxShadow: '0 4px 12px -2px #14b8a615',
          }}
        >
          round(#PanelSize, 1)
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#14b8a6' }} />
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
              color: '#14b8a6',
              marginBottom: '16px',
            }}
          >
            round(#PanelSize, 1)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“四舍五入抹掉无意义的小数碎屑，把连续拖拽的随意尺寸规整为工厂能裁切的标准公差。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#PanelSize</code>：交互端任意鼠标拖拽、角度运算或等分得到的板件原始尺寸（通常带有很多位小数，如 <code>485.625mm</code>）。
              <br />
              • <code>1</code>：保留小数位数（如保留 1 位小数精确到 <code>0.1mm</code>；若写 <code>0</code> 则精确到 <code>1mm</code> 整数）。
              <br />
              • <code>round(...)</code>：标准四舍五入。工厂数控锯和开料机无法执行微米级裁切，必须归整为规整数值。
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
            borderLeft: '4px solid #14b8a6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 1：保留 1 位小数（0.1mm）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 原始计算尺寸：<code>#PanelSize = 485.625mm</code>
                <br />
                • 计算：<code>round(485.625, 1)</code>
                <br />
                • 结果：<strong>485.6 mm</strong>，规整输出给封边机与激光打标机。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 2：取整到 1mm 整数（生产开料）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 原始计算尺寸：<code>#PanelSize = 485.625mm</code>
                <br />
                • 计算：<code>round(485.625, 0)</code>
                <br />
                • 结果：<strong>486 mm</strong>，规整进入大板套裁排版，避免生产图纸出现小数碎屑。
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
              borderTop: '4px solid #14b8a6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>消除 3D 交互端任意拖拽的毛刺小数</strong>：统一为规整尺寸；</li>
              <li><strong>ERP/MES 生产系统下料清单对接</strong>：避免极微小公差累积导致的钻孔对不齐；</li>
              <li><strong>报价单明细规范化展示</strong>：业主和审核人员看到整齐数据。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #5eead4',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              将前端自由交互产生的浮点数，与工业制造严苛的公差标准（0.1mm 或 1mm）无缝衔接。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#14b8a6',
                background: '#14b8a60d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：数控开料机防崩齿规格对齐（可在左侧切换进入【2. 3D 故事与交互演练】拖拽 rawVal 查看规整效果）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
