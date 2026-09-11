import React from 'react';

export interface BoolAtDefinitionProps {}

export const BoolAtDefinition: React.FC<BoolAtDefinitionProps> = () => {
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
          background: 'linear-gradient(135deg, #0d94880f 0%, #2dd4bf1a 100%)',
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
          BoolAt(list1, list2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #2dd4bf60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#0d9488',
            boxShadow: '0 4px 12px -2px #0d948815',
          }}
        >
          BoolAt(#Modules, [1, 2, 3])
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
            <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: '#0d9488' }} />
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
              color: '#0d9488',
              marginBottom: '16px',
            }}
          >
            BoolAt(#Modules, [1, 2, 3])
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“套系精准全量命中（不多、不少、不夹带杂件）：检测选配清单是否与官方‘豪华衣帽间三件套 [1-挂衣区, 2-首饰抽, 3-玻璃柜]’完全吻合。只有不多不少精准凑齐这 3 大件，系统才触发全柜内嵌智能氛围灯光系统与金色金属型材收口；多选或漏选都只按普通柜体排产。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#Modules</code>：客户实际选配勾选的定制功能模块编号列表。
              <br />
              • <code>[1, 2, 3]</code>：高定官方尊享套餐的严格组合白名单（1: 长大衣挂衣区配西装大衣与衣架，2: 爱马仕橙丝绒双层首饰手表抽与推拉西裤架，3: 极窄铝框茶玻展示高柜配名品陈列）。
              <br />
              • <code>BoolAt(...)</code>：严格集合比对函数。返回 <code>true</code> 或 <code>false</code>。必须数量与项目完全一致才为真。
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
            borderLeft: '4px solid #0d9488',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔢 直观计算举例（带入真实数字）
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：选配 [1, 2, 3]（满配大满贯）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 集合比对：<code>[1, 2, 3]</code> 与 <code>[1, 2, 3]</code> 丝毫不差
                <br />
                • BoolAt 判定：<strong>True（命中尊享套餐）</strong>
                <br />
                • 3D 联动动作：<strong>全柜内嵌暖色智能灯光瞬间全亮</strong>，层板前沿与玻璃柜边缘浮现金色铝合金型材，质感飙升！
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：选配 [1, 2]（漏选 3 号玻璃柜）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 集合比对：缺少 3 号玻璃展示柜
                <br />
                • BoolAt 判定：<strong>False（未集齐套餐）</strong>
                <br />
                • 3D 联动动作：未触发整套灯带系统，保持基础常规木质柜体排产，避免安装变压器时电线回路不匹配。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：选配 [1, 2, 3, 4]（多加了其它散件）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 集合比对：虽然包含 1,2,3，但混搭了 4 号散件
                <br />
                • BoolAt 判定：<strong>False（非官方标配）</strong>
                <br />
                • 3D 联动动作：不套用固定封边与开孔模版，自动转入非标定制审核流程。
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
              borderTop: '4px solid #0d9488',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              🎯 这个公式可以用来做什么？
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li><strong>营销爆款套餐精准核销</strong>：不多不少完全满足时自动赠送专属高级灯光配件；</li>
                <li><strong>非标混搭拦截</strong>：防止销售人员为了凑单乱搭配件导致工厂电路与结构打架；</li>
                <li><strong>一键升级高定质感</strong>：把离散零件的简单拼合转化为具有整套灵魂的高定空间。</li>
            </ul>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '24px 28px',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #2dd4bf',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
              💡 建模核心作用与工程价值
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
              <code>BoolAt</code> 是集合论在参数化设计中的极致应用。它守护的是工业生产的“严格组合套系契约”，让成套化销售与专属先进制造无缝咬合。
            </p>
            <div
              style={{
                fontSize: '13px',
                color: '#0d9488',
                background: '#0d94880d',
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 500,
              }}
            >
              ✦ 场景示范：三大件全选齐触发全柜内嵌奢华灯带（可在左侧切换进入【2. 3D 故事与交互演练】勾选模块体验大满配）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
