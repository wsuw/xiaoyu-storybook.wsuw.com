import React from 'react';

export interface IfDefinitionProps {}

export const IfDefinition: React.FC<IfDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #6366f10f 0%, #818cf81a 100%)',
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
          if(条件, 值1, 值2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #818cf860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#6366f1',
            boxShadow: '0 4px 12px -2px #6366f115',
          }}
        >
          {"if(#W < 500, 350, 450)"}
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
            {"if(#W < 500, 350, 450)"}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“如果宽度小于500，就用350的浅抽屉；否则用450的标准深抽屉。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#W &lt; 500</code>：判断条件。柜体总宽度是否小于 500mm（窄道环境）。
              <br />
              • <code>350</code>：条件成立（为真）时的取值。抽屉深度设为 350mm，拉出后留足人行动线，防止碰墙。
              <br />
              • <code>450</code>：条件不成立（为假）时的取值。空间宽裕，切换为 450mm 大容量深抽屉。
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 1：紧凑玄关，柜宽 420mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 输入：<code>#W = 420mm</code>
                <br />
                • 判断：<code>420 &lt; 500</code> 成立（True）
                <br />
                • 结果：抽屉深度自动切换为 <strong>350mm</strong>（浅抽屉），避免开门撞玄关门套。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>例子 2：宽敞主卧，柜宽 650mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 输入：<code>#W = 650mm</code>
                <br />
                • 判断：<code>650 &lt; 500</code> 不成立（False）
                <br />
                • 结果：抽屉深度自动升级为 <strong>450mm</strong>（深抽屉），充分利用衣柜进深多储物。
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
              borderTop: '4px solid #6366f1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>尺寸阈值自适应换型</strong>：柜宽过窄时自动降级五金导轨与抽屉进深；</li>
              <li><strong>消除重复建模</strong>：无需为“浅柜版”和“深柜版”分别画两套模型，一套公式全部搞定；</li>
              <li><strong>安装防碰撞保障</strong>：在方案设计阶段就自动杜绝碰撞缺陷。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #818cf8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              条件二分支是参数化设计中最核心的基础设施，让模型具备“懂空间、知进退”的智能生命力。
            </p>
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
              ✦ 场景示范：窄道玄关柜与抽屉避让（可在左侧切换进入【2. 3D 故事与交互演练】拖动柜宽在 500 前后感受抽屉深度切换）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
