import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface RoundStorySceneProps {
  rawVal?: number;
}

const RoundMesh: React.FC<RoundStorySceneProps> = ({
  rawVal = 485.625,
}) => {

    const rounded = Math.round(rawVal * 10) / 10;
    const scaleX = rounded / 300;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[scaleX, 1.4, 0.8]} />
          <meshStandardMaterial color="#14b8a6" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.015, scaleX, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#0d9488" />
        </mesh>
      </group>
    );
};

export const RoundStoryScene: React.FC<RoundStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #14b8a60f 0%, #5eead41a 100%)',
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
          round(#A, 2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #5eead460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#14b8a6',
            boxShadow: '0 4px 12px -2px #14b8a615',
          }}
        >
          round(#PanelSize, 1)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #14b8a608 65%, #14b8a616 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#5eead4" />
            <RoundMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#14b8a6"
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
              📖 业务故事：数控开料机防崩齿规格对齐
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              设计师在 3D 里用鼠标随意一拉，柜板宽度变成了 485.678mm 的毛刺数值。若直接送到车间，数控机床无法对齐。小宇用四舍五入锁定一位小数：485.7mm！
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#14b8a60d',
              borderLeft: '3px solid #14b8a6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            将交互端随意的连续浮点数，规整为符合工业公差与生产加工的精准尺寸。
          </div>
        </div>
      </div>
    </div>
  );
};
