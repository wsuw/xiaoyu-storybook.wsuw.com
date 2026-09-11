import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface NestedIfStorySceneProps {
  w?: number;
}

const NestedIfCabinetMesh: React.FC<NestedIfStorySceneProps> = ({
  w = 1200,
}) => {
  // 比例映射：将柜宽 mm 映射为 3D 场景单位（以 1200mm = 3.0 为基础）
  const cabinetW = (w / 1200) * 3.0;
  const cabinetH = 2.4;
  const cabinetD = 0.9;
  const boardThick = 0.04;

  // nestedif 逻辑核心计算
  // nestedif(#W <= 800, 1, #W <= 1500, 2, #W <= 2200, 3, 4)
  let bayCount = 1;
  let tierLabel = '单腔独立大通柜';
  if (w <= 800) {
    bayCount = 1;
    tierLabel = '≤800mm → 1 个独立通腔';
  } else if (w <= 1500) {
    bayCount = 2;
    tierLabel = '≤1500mm → 2 个单元腔（立起 1 块立板）';
  } else if (w <= 2200) {
    bayCount = 3;
    tierLabel = '≤2200mm → 3 个单元腔（立起 2 块立板）';
  } else {
    bayCount = 4;
    tierLabel = '>2200mm → 4 个单元腔（立起 3 块立板）';
  }

  const dividerCount = bayCount - 1;
  const innerW = cabinetW - boardThick * 2 - dividerCount * boardThick;
  const bayWidth = innerW / bayCount;

  // 计算每个中立板的 X 轴坐标
  const dividerXPositions: number[] = [];
  const startX = -cabinetW / 2 + boardThick;
  for (let i = 1; i <= dividerCount; i++) {
    const x = startX + i * bayWidth + (i - 0.5) * boardThick;
    dividerXPositions.push(x);
  }

  // 计算每个腔室中心的 X 轴坐标
  const bayCenterPositions: number[] = [];
  for (let i = 0; i < bayCount; i++) {
    const cx = startX + i * (bayWidth + boardThick) + bayWidth / 2;
    bayCenterPositions.push(cx);
  }

  return (
    <group position={[0, -0.2, 0]}>
      {/* 顶板 */}
      <mesh position={[0, cabinetH / 2 - boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* 底板 */}
      <mesh position={[0, -cabinetH / 2 + boardThick / 2, 0]}>
        <boxGeometry args={[cabinetW, boardThick, cabinetD]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* 左侧板 */}
      <mesh position={[-cabinetW / 2 + boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>
      {/* 右侧板 */}
      <mesh position={[cabinetW / 2 - boardThick / 2, 0, 0]}>
        <boxGeometry args={[boardThick, cabinetH, cabinetD]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>
      {/* 背板 */}
      <mesh position={[0, 0, -cabinetD / 2 + 0.01]}>
        <boxGeometry args={[cabinetW - boardThick * 2, cabinetH - boardThick * 2, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* 动态立柱隔板（受 nestedif 驱动） */}
      {dividerXPositions.map((posX, idx) => (
        <group key={`divider-${idx}`} position={[posX, 0, 0]}>
          <mesh>
            <boxGeometry args={[boardThick, cabinetH - boardThick * 2, cabinetD - 0.02]} />
            <meshStandardMaterial color="#8b5cf6" metalness={0.2} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 各腔体内部规整活动层板 */}
      {bayCenterPositions.map((cx, idx) => (
        <group key={`bay-${idx}`} position={[cx, 0, 0]}>
          {/* 上层活动层板 */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[bayWidth - 0.01, boardThick, cabinetD - 0.04]} />
            <meshStandardMaterial color="#64748b" roughness={0.4} />
          </mesh>

          {/* 下层活动层板 */}
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[bayWidth - 0.01, boardThick, cabinetD - 0.04]} />
            <meshStandardMaterial color="#64748b" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const NestedIfStoryScene: React.FC<NestedIfStorySceneProps> = (props) => {
  const currentW = props.w ?? 1200;

  let bayCount = 1;
  let currentTierText = '';
  let badgeColor = '#6366f1';

  if (currentW <= 800) {
    bayCount = 1;
    currentTierText = '档位 1: #W ≤ 800 → 1 独立通腔 (无中立板)';
    badgeColor = '#3b82f6';
  } else if (currentW <= 1500) {
    bayCount = 2;
    currentTierText = '档位 2: #W ≤ 1500 → 2 单元腔 (1 块中立板)';
    badgeColor = '#8b5cf6';
  } else if (currentW <= 2200) {
    bayCount = 3;
    currentTierText = '档位 3: #W ≤ 2200 → 3 单元腔 (2 块中立板)';
    badgeColor = '#a855f7';
  } else {
    bayCount = 4;
    currentTierText = '档位 4: 默认兜底 > 2200 → 4 单元大衣柜 (3 块中立板)';
    badgeColor = '#d946ef';
  }

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
          padding: '14px 28px',
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

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #8b5cf608 65%, #8b5cf616 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.3, 5.8], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 2, 3]} intensity={0.7} color="#c4b5fd" />
            <NestedIfCabinetMesh {...props} />
            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={0.35}
              scale={9}
              blur={2}
              far={3.5}
              color="#8b5cf6"
            />
            <OrbitControls target={[0, -0.1, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.05} />
          </Canvas>

          {/* 实时状态浮窗 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #e2e8f0',
              padding: '12px 18px',
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              当前柜体宽度：<span style={{ color: '#8b5cf6' }}>{currentW} mm</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>命中结果：</span>
              <span
                style={{
                  fontWeight: 700,
                  color: badgeColor,
                  background: `${badgeColor}15`,
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {currentTierText}
              </span>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #e2e8f0',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#64748b',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              pointerEvents: 'none',
            }}
          >
            ✦ 3D 视口：按住鼠标左键旋转 · 右键平移 · 滚轮缩放
          </div>
        </div>

        <div
          style={{
            flexShrink: 0,
            padding: '16px 32px',
            background: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <div>
            <h4
              style={{
                margin: '0 0 6px 0',
                fontSize: '15px',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              📖 业务故事：柜体宽度驱动多级分腔与立板加固
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              层板跨度如果超过 800mm，承重日久必然向下弯曲变形。小宇使用 <code>nestedif</code> 设立 4 级阶梯：≤800mm 单通腔；≤1500mm 立起 1 块中立板分双腔；≤2200mm 立起 2 块分三腔；超过 2200mm 自动升级为四腔整墙大衣柜。在 Controls 拖动柜宽感受结构跃迁！
            </p>
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#8b5cf60d',
              borderLeft: '3px solid #8b5cf6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            多分支平铺直叙，无需繁琐嵌套括号。柜体拉伸到任意宽度，大骨架立柱和腔室格局全部自适应演进，彻底守住结构安全底线。
          </div>
        </div>
      </div>
    </div>
  );
};
