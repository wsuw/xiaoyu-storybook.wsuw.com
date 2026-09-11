import React from 'react';

export interface NestedIfDefinitionProps {}

export const NestedIfDefinition: React.FC<NestedIfDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #8b5cf60f 0%, #a78bfa1a 100%)',
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
          nestedif(...)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a78bfa60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#8b5cf6',
            boxShadow: '0 4px 12px -2px #8b5cf615',
          }}
        >
          {"nestedif(#W <= 800, 1, #W <= 1500, 2, #W <= 2200, 3, 4)"}
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#8b5cf6' }} />
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
              color: '#8b5cf6',
              marginBottom: '16px',
            }}
          >
            {"nestedif(#W <= 800, 1, #W <= 1500, 2, #W <= 2200, 3, 4)"}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“柜子拉伸多宽，就阶梯分出几个单元腔体：小柜单腔、中柜分双腔、大柜分三腔、超宽大柜分四腔！”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析（条件-返回值成对平铺，末尾是默认兜底值）：</strong>
              <br />
              • <code>#W &lt;= 800, 1</code>：第一档。如果柜宽 ≤ 800mm，不设中立板，作为 <strong>1 个独立大通腔</strong>。
              <br />
              • <code>#W &lt;= 1500, 2</code>：第二档。柜宽在 801~1500mm 时，立起 1 块立板，均分为 <strong>2 个单元腔</strong>。
              <br />
              • <code>#W &lt;= 2200, 3</code>：第三档。柜宽在 1501~2200mm 时，立起 2 块立板，均分为 <strong>3 个单元腔</strong>。
              <br />
              • <code>4</code>：最终兜底。柜宽 &gt; 2200mm（大型整墙衣柜），自动拆分为 <strong>4 个单元腔</strong>（立起 3 块立板），杜绝层板跨度超标下塌。
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
            borderLeft: '4px solid #8b5cf6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（四大阶梯档位实测）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 1：柜宽 650mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 命中：<code>650 &lt;= 800</code>
                <br />
                • 结果：<strong>1 个大通腔</strong>，无立板，收纳大物件。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 2：柜宽 1200mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 命中：<code>1200 &lt;= 1500</code>
                <br />
                • 结果：拆为 <strong>2 腔（左右各 600）</strong>，立起 1 块中立板。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 3：柜宽 1800mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 命中：<code>1800 &lt;= 2200</code>
                <br />
                • 结果：拆为 <strong>3 腔（三等分）</strong>，立起 2 块中立板。
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>档位 4：柜宽 2400mm</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                • 兜底：<code>&gt; 2200mm</code>
                <br />
                • 结果：自动拆为 <strong>4 腔大衣柜墙</strong>，立起 3 块中立板！
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
              borderTop: '4px solid #8b5cf6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>结构承重安全兜底</strong>：定制板材跨度不能超过 800mm（否则层板必弯），阶梯自动补立柱；</li>
              <li><strong>整墙柜体模块化自适应</strong>：无需设计师反复插入单元柜，拉伸总宽，腔体排布自动演进；</li>
              <li><strong>告别括号嵌套地狱</strong>：取代 <code>if(..., if(..., if(...)))</code>，多分支平铺直叙，清晰健壮。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #a78bfa',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              <code>nestedif</code> 是多档位分级系统的终极利器。当输入变量跨度大（如柜宽从 500mm 到 2600mm）时，能让单一模型实现质的阶梯级结构跃迁。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#8b5cf6',
                background: '#8b5cf60d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：柜宽驱动 1~4 单元分腔（可在左侧切换进入【2. 3D 故事与交互演练】拖动柜宽从 600 到 2400 观察结构立板变化）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
