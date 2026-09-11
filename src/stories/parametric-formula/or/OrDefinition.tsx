import React from 'react';

export interface OrDefinitionProps {}

export const OrDefinition: React.FC<OrDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #ea580c0f 0%, #fb923c1a 100%)',
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
          条件1 or 条件2
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fb923c60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ea580c',
            boxShadow: '0 4px 12px -2px #ea580c15',
          }}
        >
          {"if(#H > 2000 or #W > 600, 1, 0)"}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#ea580c' }} />
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
            {"if(#H > 2000 or #W > 600, 1, 0)"}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“或条件（任一满足即生效）：门板高度一旦超过2米（一门到顶），或者门板宽度超过0.6米（横向受力大），只要占了任意一项，背后就必须强制嵌装一整根金属防弯拉直器！”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#H &gt; 2000</code>：高度超标触发条件。门板过高极易受重力下坠与四季温湿度交替导致纵向拱曲。
              <br />
              • <code>or</code>：逻辑或连接词。只要左边或右边任意一个条件为真（True），判断立刻成立。
              <br />
              • <code>#W &gt; 600</code>：宽度超标触发条件。单门过宽横向力矩剧增，门板极易翘曲变形。
              <br />
              • <code>1, 0</code>：成立时输出 <code>1</code>（门背强制开槽嵌装通体金属拉直器）；都不满足输出 <code>0</code>（标准小柜门无需拉直器）。
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
            borderLeft: '4px solid #ea580c',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：高 2400mm，宽 450mm（一门到顶细长门）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>2400 &gt; 2000 (真)</code>，宽 450 未超标
                <br />
                • or 计算：<strong>真（True，高度单项超标触发）</strong>
                <br />
                • 结果配置：<strong>强制嵌装 1 根金属拉直器</strong>，强力拉直防止门板变弯翘头。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：高 1600mm，宽 750mm（矮胖宽单开门）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：高未超标，但 <code>750 &gt; 600 (真)</code>
                <br />
                • or 计算：<strong>真（True，宽度单项超标触发）</strong>
                <br />
                • 结果配置：<strong>强制嵌装 1 根金属拉直器</strong>，化解门扇宽幅应力扭曲。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：高 1500mm，宽 450mm（常规小地柜门）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 校验：<code>1500 &gt; 2000 (假)</code> 且 <code>450 &gt; 600 (假)</code>
                <br />
                • or 计算：<strong>假（False，两项指标均在安全范围）</strong>
                <br />
                • 结果配置：<strong>0 根拉直器</strong>。普通门板即可稳定运行，避免增加加工开槽成本。
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
              borderTop: '4px solid #ea580c',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li><strong>多重工艺红线双保险</strong>：无论是“一门到顶”还是“超宽门”，任意超标自动补救；</li>
                <li><strong>CNC 加工自动加槽</strong>：驱动机加工自动在门板背面生成通长拉直器铝槽及安装孔；</li>
                <li><strong>杜绝漏加五金索赔</strong>：把设计师脑中的经验经验变成硬性公式，杜绝售后弯门下垂事故。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #fb923c',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              <code>or</code> 逻辑常用于“工业安全防线”与“质量红线”。只要触发任何一种危险工况，系统就能立刻自动补全加强结构！
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#ea580c',
                background: '#ea580c0d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：超高或超宽自动嵌装金属拉直器（可在左侧切换进入【2. 3D 故事与交互演练】拖动门板高/宽，观察拉直器出现）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
