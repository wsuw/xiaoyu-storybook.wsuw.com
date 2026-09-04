import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface SinCosStorySceneProps {
  angle?: number;
}

const SinCosMesh: React.FC<SinCosStorySceneProps> = ({
  angle = 45,
}) => {

    const rad = (angle * Math.PI) / 180;
    const r = 0.95;
    const posX = r * Math.sin(rad);
    const posZ = r * Math.cos(rad) - r;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.8, 1.6, 1.8]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        <group position={[posX, 0.2, posZ]}>
          <mesh rotation={[0, rad * 1.5, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
            <meshStandardMaterial color="#f43f5e" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <torusGeometry args={[0.68, 0.02, 16, 32]} />
            <meshStandardMaterial color="#e11d48" />
          </mesh>
        </group>
      </group>
    );
};

export const SinCosStoryScene: React.FC<SinCosStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #f43f5e0f 0%, #fb71851a 100%)',
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
          sin(θ) 与 cos(θ)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fb718560',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f43f5e',
            boxShadow: '0 4px 12px -2px #f43f5e15',
          }}
        >
          X = R*cos(θ), Z = R*sin(θ)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f43f5e08 65%, #f43f5e16 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#fb7185" />
            <SinCosMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#f43f5e"
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
              📖 业务故事：转角地柜飞碟转篮的丝滑盘旋
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              厨房 L 型拐角深不可及。小宇设计了一套飞碟旋转托盘。当角度从 0° 旋转至 90° 时，正弦与余弦函数实时推演盘面中心轨迹，让转盘优雅滑出柜体。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#f43f5e0d',
              borderLeft: '3px solid #f43f5e',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            利用三角函数构建三维空间内的圆弧与旋转轨迹，驱动旋转门与五金机构动态模拟。
          </div>
        </div>
      </div>
    </div>
  );
};
