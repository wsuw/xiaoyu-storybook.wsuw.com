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
          BoolAt(#Selected, [0, 1, 2])
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
            BoolAt(#Selected, [0, 1, 2])
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“套系精确命中判断（不多不少完全吻合）：检验所选清单与官方标准套餐是否丝毫不差完全对齐。例如工厂推出‘尊享厨电三件套 [0, 1, 2]’，必须且只能选中这3项，系统才会激活连体激光无缝封边与隐藏式插座模组，多选或少选都不会误触发。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#Selected</code>：用户实际多选的组件编号数组。
              <br />
              • <code>[0, 1, 2]</code>：官方定义的严格套餐组合模板列表。
              <br />
              • 返回值：布尔值 <code>true</code> 或 <code>false</code>。要求集合元素完全对称相等，严密防止非标混搭引起的生产工艺冲突。
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
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：用户选配 #Selected = [0, 1, 2]（精准套餐）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较校验：选配列表与目标套系 <code>[0, 1, 2]</code> 完全一一对应
                <br />
                • BoolAt 判定：<strong>True</strong>
                <br />
                • 联动响应：自动绑定官方套餐专属的激光封边打标、隐藏式排插模块及赠品五金装配包。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：用户选配 #Selected = [0, 1]（少选了 2 号）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较校验：缺少 2 号关键组件
                <br />
                • BoolAt 判定：<strong>False</strong>
                <br />
                • 联动响应：不触发套系专属工艺，按普通单独散件排产，避免现场安装时接口悬空。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 C：用户选配 #Selected = [0, 1, 2, 5]（多加了散件）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 比较校验：虽然包含了 0,1,2，但额外夹带了 5 号异形散件
                <br />
                • BoolAt 判定：<strong>False</strong>
                <br />
                • 联动响应：拒绝自动套用标准固模，提示需经由拆单工程师复核。
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
                <li>促销组合套系校验，不多不少完全相符时触发专属封边工艺；</li>
                <li>固定款型门板与五金包的排他性装配检查；</li>
                <li>避免用户漏选或错选组件造成生产端打件混乱。</li>
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
              严格判定两组选项完全相等，用于限定款、套餐包与专属特定工艺的绝对匹配。
            </p
            >
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
              ✦ 场景示范：初春限定尊享套餐与一体封边（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
