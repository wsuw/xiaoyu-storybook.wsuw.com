import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { FormulaStory } from './FormulaStoryData';

export interface FormulaLayoutProps {
  story: FormulaStory;
  render3D: (val1: number, val2: number, accent: string) => React.ReactNode;
  mode?: 'definition' | 'story';
  val1?: number;
  val2?: number;
  onParam1Change?: (v: number) => void;
  onParam2Change?: (v: number) => void;
}

export const FormulaLayout: React.FC<FormulaLayoutProps> = ({
  story,
  render3D,
  mode = 'story',
  val1: controlledVal1,
  val2: controlledVal2,
  onParam1Change,
  onParam2Change,
}) => {
  const [internalParam1, setInternalParam1] = useState<number>(story.paramDef.defaultVal);
  const [internalParam2, setInternalParam2] = useState<number>(story.paramDef2?.defaultVal ?? 400);

  const param1 = controlledVal1 !== undefined ? controlledVal1 : internalParam1;
  const param2 = controlledVal2 !== undefined ? controlledVal2 : internalParam2;

  const handleParam1Change = (v: number) => {
    setInternalParam1(v);
    onParam1Change?.(v);
  };

  const handleParam2Change = (v: number) => {
    setInternalParam2(v);
    onParam2Change?.(v);
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1e293b',
      }}
    >
      {/* 顶部标题区：自适应宽幅主题条 */}
      <div
        style={{
          padding: '20px 32px',
          borderBottom: '1px solid #f1f5f9',
          background: `linear-gradient(135deg, ${story.colorTheme}0f 0%, ${story.accent}1a 100%)`,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.5px',
            }}
          >
            {story.name}
          </h2>
        </div>

        {/* 映射公式芯片 */}
        <div
          style={{
            background: '#ffffff',
            border: `1px solid ${story.accent}60`,
            padding: '10px 20px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: story.colorTheme,
            boxShadow: `0 4px 12px -2px ${story.colorTheme}15`,
          }}
        >
          {story.formula}
        </div>
      </div>

      {/* 视图分流：模式一【公式定义与解析】 */}
      {mode === 'definition' ? (
        <div style={{ flex: 1, padding: '32px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 顶栏简介 */}
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
              <span style={{ display: 'inline-block', width: '8px', height: '18px', borderRadius: '4px', background: story.colorTheme }} />
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
                color: story.colorTheme,
                marginBottom: '16px',
              }}
            >
              {story.formula}
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.8', color: '#475569' }}>
              <strong>语法格式说明：</strong> 在 3D 参数化组件系统中，输入变量以 <code>#</code> 开头（如 <code>#W</code>, <code>#D</code>, <code>#H</code>）。公式根据所赋逻辑运算规则实时解算出构件的物理尺寸、BIM属性或空间位姿。
            </p>
          </div>

          {/* 两列卡片：可以用来做什么 vs 建模核心作用 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '24px 28px',
                border: '1px solid #e2e8f0',
                borderTop: `4px solid ${story.colorTheme}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
                🎯 这个公式可以用来做什么？
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.9', color: '#334155' }}>
                <li>在全屋定制与家具三维设计中，自动实现<strong>构件防干涉避让</strong>；</li>
                <li>根据空间总尺寸动态匹配<strong>不同工艺等级或五金规格</strong>；</li>
                <li>减少重复建模块，达到“<strong>一次建模、无限衍生自适配</strong>”的设计标准。</li>
              </ul>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '24px 28px',
                border: '1px solid #e2e8f0',
                borderTop: `4px solid ${story.accent}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0f172a' }}>
                💡 建模核心作用与工程价值
              </h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.8', color: '#334155' }}>
                {story.roleExplanation}
              </p>
              <div
                style={{
                  fontSize: '13px',
                  color: story.colorTheme,
                  background: `${story.colorTheme}0d`,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontWeight: 500,
                }}
              >
                ✦ 关联场景示范：{story.storyTitle}（可在第二个 Story 中查看 3D 联动实验）
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 模式二【3D 场景故事与交互演练】：满幅自适应 */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 中部：清新浅色主题 3D 视口（沾满可用容器高度） */}
          <div
            style={{
              flex: 1,
              minHeight: '480px',
              width: '100%',
              position: 'relative',
              background: `radial-gradient(circle at 50% 35%, #ffffff 0%, ${story.colorTheme}08 65%, ${story.colorTheme}18 100%)`,
            }}
          >
            <Canvas camera={{ position: [0, 2, 4.8], fov: 45 }} gl={{ antialias: true }}>
              <color attach="background" args={['#fafafa']} />
              <ambientLight intensity={0.7} />
              <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
              <directionalLight position={[-6, -4, -6]} intensity={0.3} />
              <pointLight position={[0, 3, 2]} intensity={0.8} color={story.accent} />

              {/* 专属 3D 渲染 */}
              {render3D(param1, param2, story.accent)}

              {/* 接地主题色柔和阴影 */}
              <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.4}
                scale={7}
                blur={2}
                far={3}
                color={story.colorTheme}
              />

              <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.05} />
            </Canvas>

            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '20px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #e2e8f0',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#64748b',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                pointerEvents: 'none',
              }}
            >
              ✦ 3D 视口：按住鼠标左键旋转 · 右键平移 · 滚轮缩放
            </div>
          </div>

          {/* 下部：场景故事与参数实时双向调节卡片 */}
          <div
            style={{
              padding: '24px 32px',
              background: '#ffffff',
              borderTop: '1px solid #f1f5f9',
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {/* 场景故事 */}
            <div>
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                📖 业务故事：{story.storyTitle}
              </h4>
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#475569',
                }}
              >
                {story.narrative}
              </p>
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#334155',
                  background: `${story.colorTheme}0d`,
                  borderLeft: `3px solid ${story.colorTheme}`,
                  padding: '10px 14px',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <strong>💡 联动价值：</strong>
                {story.roleExplanation}
              </div>
            </div>

            {/* 参数输入与滑块控制盒 */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>参数输入修改 (实时驱动模型)</span>
                <span style={{ fontSize: '11px', color: story.colorTheme }}>可在 Story Controls 中联动</span>
              </div>

              {/* 参数 1：滑块 + 输入框 */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                    {story.paramDef.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="number"
                      min={story.paramDef.min}
                      max={story.paramDef.max}
                      step={story.paramDef.step}
                      value={param1}
                      onChange={(e) => handleParam1Change(parseFloat(e.target.value) || 0)}
                      style={{
                        width: '75px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        color: story.colorTheme,
                        fontWeight: 700,
                        textAlign: 'right',
                      }}
                    />
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{story.paramDef.unit || ''}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={story.paramDef.min}
                  max={story.paramDef.max}
                  step={story.paramDef.step}
                  value={param1}
                  onChange={(e) => handleParam1Change(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: story.colorTheme, cursor: 'pointer' }}
                />
              </div>

              {/* 参数 2 (如有) */}
              {story.paramDef2 && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                      {story.paramDef2.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="number"
                        min={story.paramDef2.min}
                        max={story.paramDef2.max}
                        step={story.paramDef2.step}
                        value={param2}
                        onChange={(e) => handleParam2Change(parseFloat(e.target.value) || 0)}
                        style={{
                          width: '75px',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          fontFamily: 'monospace',
                          color: story.colorTheme,
                          fontWeight: 700,
                          textAlign: 'right',
                        }}
                      />
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{story.paramDef2.unit || ''}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={story.paramDef2.min}
                    max={story.paramDef2.max}
                    step={story.paramDef2.step}
                    value={param2}
                    onChange={(e) => handleParam2Change(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: story.colorTheme, cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
