import React from 'react';

export interface AllInDefinitionProps {}

export const AllInDefinition: React.FC<AllInDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #0284c70f 0%, #38bdf81a 100%)',
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
          AllIn(list1, list2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #38bdf860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0284c7',
            boxShadow: '0 4px 12px -2px #0284c715',
          }}
        >
          AllIn(#Selected, [1, 2, 3])
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
            AllIn(#Selected, [1, 2, 3])
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“集合全包含检查（子集必须全在，多选不影响）：检测用户所选的配置清单是否「全部包含了」三大核心重载项 [1-悬空无地脚, 2-大理石岩板厚台面, 3-双人双台盆]。只要这三项都在，哪怕客户额外加配了智能镜柜和感应夜灯，系统强制在柜底预埋 3 组入墙加厚镀锌三角悬挑钢架，坚决杜绝柜体下坠脱落事故。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#Selected</code>：用户实际选配的项目编号数组（如 <code>[1, 2, 3, 4, 5]</code>）。
              <br />
              • <code>[1, 2, 3]</code>：必须全部覆盖的高危力学组合（1:悬空壁挂无脚，2:大理石岩板厚台面，3:双人双台盆满载自重）。
              <br />
              • <code>AllIn(A, B)</code>：超集全包含判断（即 $B \subseteq A$）。只要 $B$ 中每一个项目都在 $A$ 中即为 <code>true</code>；只要缺少任何 1 项即为 <code>false</code>。
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
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：选配 [1, 2, 3, 4, 5]（顶配超集）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 必查三大件：<code>1, 2, 3</code> 全在集合中
                <br />
                • 额外加配：4-智能除雾镜、5-感应夜灯
                <br />
                • AllIn 判定：<strong>True（全包含超集成立）</strong>
                <br />
                • 动作：<strong>虽然多加了小件，但三大重载要素已齐聚</strong>，必须立即在底盘预埋 3 组入墙加厚三角悬挑钢架与植筋螺栓！
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：选配 [1, 2, 3]（基础重载三件刚好齐备）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 必查三大件：<code>1, 2, 3</code> 一个不少
                <br />
                • 额外加配：无
                <br />
                • AllIn 判定：<strong>True（全包含）</strong>
                <br />
                • 动作：同样启动悬挑钢梁防下坠工艺，守住安全底线。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：选配 [2, 3, 4, 5]（选了落地有脚支撑，漏了1-悬空）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 必查三大件：缺 1-悬空（柜体已落地有脚）
                <br />
                • 额外加配：选了 4 与 5
                <br />
                • AllIn 判定：<strong>False（未全包含）</strong>
                <br />
                • 动作：地面立腿已承担大部分垂直下压力，无需预埋昂贵的重型三角悬挑钢架，按常规安装降低安装造价。
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
              borderTop: '4px solid #0284c7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式在全屋定制中用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
              <li><strong>高危悬空结构兜底</strong>：悬空+厚石材+宽大跨度同时出现时，强制介入工业级钢梁支撑；</li>
              <li><strong>与 <code>BoolAt</code> 的本质区别</strong>：<code>BoolAt</code> 只能全等命中，而 <code>AllIn</code> 允许客户自由多选升级，只要包含核心子集即触发安全兜底；</li>
              <li><strong>杜绝墙体撕裂事故</strong>：解决大理石悬空台盆因重力力臂下沉导致瓷砖破裂、管道拉脱漏水的行业大痛点。</li>
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
              <code>AllIn</code> 守护的是“高阶工况的充分性条件”。它让参数化设计系统在面对成百上千种个性化选配排列组合时，能够精准锚定真正危险的关键因子交集，实现精益制造与结构安全的绝佳平衡。
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
              ✦ 场景示范：高定悬空卫浴柜三角承重钢架（可在 3D 交互演练中自由组合 5 项配置体验）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
