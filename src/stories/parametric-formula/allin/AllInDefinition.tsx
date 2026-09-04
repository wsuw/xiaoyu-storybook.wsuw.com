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
          AllIn(#Selected, [0, 1, 2])
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
            AllIn(#Selected, [0, 1, 2])
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
            <p style={{ margin: 0 }}>
              <strong>通俗一句话：</strong> <strong>“集合全包含检查（必须全部拥有）：检测用户所选的项目集合是否全部包含了指定的目标清单。例如当客户在电器高柜中同时选配了 0号蒸箱、1号烤箱、2号洗碗机 这三件重载电器时，必须自动在柜内生成一体化金属承重支架与贯通式背部导热通风烟道。”</strong>
            </p>
            <p style={{ margin: 0, color: '#475569' }}>
              <strong>参数含义解析：</strong>
              <br />
              • <code>#Selected</code>：当前选中的项目 ID 数组集合（例如 <code>[0, 1, 2, 4]</code>）。
              <br />
              • <code>[0, 1, 2]</code>：待校验的目标必备项基准列表（必须全部都在 <code>#Selected</code> 中）。
              <br />
              • 返回值：布尔值 <code>true</code> 或 <code>false</code>。只要缺哪怕任何一项，即返回 <code>false</code>。
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 A：用户选配 #Selected = [0, 1, 2, 3]（满配四件套）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 目标基准：<code>[0, 1, 2]</code>
                <br />
                • 校验过程：0 在集合中、1 在集合中、2 也在集合中，<strong>全部命中</strong>
                <br />
                • AllIn 返回：<strong>True</strong>
                <br />
                • 柜体响应：总发热量巨大且自重超过 80kg，自动在柜体后方生成贯通强排导风槽，底板升级为加厚钢底座。
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>情况 B：用户选配 #Selected = [0, 2]（仅选了蒸箱和洗碗机）</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
                • 目标基准：<code>[0, 1, 2]</code>
                <br />
                • 校验过程：缺少 1 号烤箱（未全部包含）
                <br />
                • AllIn 返回：<strong>False</strong>
                <br />
                • 柜体响应：无需触发最高等级的贯通三层散热风道，按常规局部隔热板处理，降低五金工艺和柜体成本。
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
                <li>电器套餐成套检测，当必要设备齐集时自动增加散热排风道与承重架；</li>
                <li>复杂组合定制家具中，判断多模块同时存在的联动结构保护；</li>
                <li>多选列表下的高阶条件约束。</li>
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
              校验多元件集合依赖关系，一旦满足全部必备配置，立刻激活关联的加固构件或强化工艺。
            </p
            >
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
              ✦ 场景示范：高端厨电三件套与重载底座（可在左侧切换进入【2. 3D 故事与交互演练】实时调节参数驱动模型）
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
