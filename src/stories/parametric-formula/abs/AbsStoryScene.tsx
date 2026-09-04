import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface AbsStorySceneProps {
  offsetX?: number;
}

const AbsMesh: React.FC<AbsStorySceneProps> = ({
  offsetX = -120,
}) => {

    const offset = offsetX / 100;
    const cutoutAbs = Math.abs(offsetX) / 100;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[2.2, 1.5, 0.08]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[offset * 0.7, 0.5, 0.05]}>
          <boxGeometry args={[cutoutAbs * 0.7, 0.7, 0.1]} />
          <meshStandardMaterial color="#84cc16" metalness={0.5} />
        </mesh>
      </group>
    );
};

export const AbsStoryScene: React.FC<AbsStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #84cc160f 0%, #a3e6351a 100%)',
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
          abs(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a3e63560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#84cc16',
            boxShadow: '0 4px 12px -2px #84cc1615',
          }}
        >
          abs(#OffsetX) * #Depth
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #84cc1608 65%, #84cc1616 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#a3e635" />
            <AbsMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#84cc16"
            />
            <OrbitControls target={[0, 0.1, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.05} />
          </Canvas>
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
              📖 业务故事：左右凸柱包管避让缺口算料
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              房间墙角可能在左侧（偏移负数），也可能在右侧（偏移正数）。在计算避让板材挖空的扣减总面积时，小宇使用绝对值，让损耗面积计算永远为正。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#84cc160d',
              borderLeft: '3px solid #84cc16',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            剥离空间坐标的正负方向性，提取纯粹的位移标量用于材料加工与耗材统计。
          </div>
        </div>
      </div>
    </div>
  );
};
