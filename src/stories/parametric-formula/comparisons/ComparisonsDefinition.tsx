import React from 'react';

export interface ComparisonsDefinitionProps {}

export const ComparisonsDefinition: React.FC<ComparisonsDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #64748b0f 0%, #94a3b81a 100%)',
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
          {"比较运算符 (<, >, <=, >=)"}
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #94a3b860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0f172a',
            boxShadow: '0 4px 12px -2px #64748b15',
          }}
        >
          {"if(#H >= 1550, 1, 0)"}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#0284c7' }} />
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
              color: '#0284c7',
              marginBottom: '16px',
            }}
          >
            {"if(#H >= 1550, 1, 0)"}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“人体工学防撞头红线：吊柜离地安装高度 #H 只要大于等于 1550mm（满足安全开阔视野），判定为 1（安全放行）；一旦低于 1550mm（低头备餐极易磕碰额头），判定为 0 并即刻亮起碰头危险示警！”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#H</code>：吊柜底部距离地面的实际设计安装净高（毫米）。
              <br />
              • <code>&gt;= 1550</code>：大于等于比较运算符。1550mm 是定制橱柜人体工学视线避让与弯腰防撞的核心分水岭。
              <br />
              • <code>1, 0</code>：当满足 <code>&gt;= 1550</code> 时输出 <code>1</code>（绿色安全通行，操作无拘束）；低于阈值输出 <code>0</code>（红色碰头风险警告）。
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
            borderLeft: '4px solid #0284c7',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：吊柜底高 #H = 1600mm（标准大厨房）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较判断：<code>1600 &gt;= 1550</code> 结果为 <strong>真（True）</strong>
                <br />
                • 计算结果：<strong>1（安全合格）</strong>
                <br />
                • 体验：视野通透开阔，烹饪/切菜低头完全无压迫感与碰撞风险。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：吊柜底高 #H = 1550mm（恰好压在临界线）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较判断：<code>1550 &gt;= 1550</code> 因含等于号，结果为 <strong>真（True）</strong>
                <br />
                • 计算结果：<strong>1（达标临界）</strong>
                <br />
                • 体验：边界数值严谨闭环，卡住国标推荐的最低下限。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：吊柜底高 #H = 1450mm（过低盲区安装）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较判断：<code>1450 &gt;= 1550</code> 结果为 <strong>假（False）</strong>
                <br />
                • 计算结果：<strong>0（危险撞头警告）</strong>
                <br />
                • 体验：系统触发防撞报警红光，杜绝客户入住后磕碰额头导致售后索赔。
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
              borderTop: '4px solid #0284c7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li><strong>人体工学安全拦截</strong>：用比较运算符守住视线与活动动线的安全净空；</li>
                <li><strong>新手设计师防错哨兵</strong>：拉低吊柜时自动报红，杜绝设计不合规交付；</li>
                <li><strong>施工图纸干涉校验</strong>：在模型阶段消除现场与人体/台面的严重干涉。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #38bdf8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              比较运算符（<code>&gt;, &lt;, &gt;=, &lt;=</code>）是参数化设计中守护“国标/行标安全临界值”的数字哨兵，把安全隐患消灭在渲染出图前。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#0284c7',
                background: '#0284c70d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：吊柜安装高度与防撞头安全区联动（可在左侧切换进入【2. 3D 故事与交互演练】拖动吊柜离地高度体验安全红线）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
