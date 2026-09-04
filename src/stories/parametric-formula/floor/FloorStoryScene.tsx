import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface FloorStorySceneProps {
  netH?: number;
}

const FloorMesh: React.FC<FloorStorySceneProps> = ({
  netH = 720,
}) => {

    const count = Math.floor(netH / 200);
    const totalH = netH / 500;
    return (
      <group position={[0, -0.3, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.6, totalH, 1.0]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        {Array.from({ length: count }).map((_, i) => (
          <mesh key={i} position={[0, 0.3 - totalH / 2 + 0.22 + i * 0.44, 0]}>
            <boxGeometry args={[1.45, 0.36, 0.95]} />
            <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
};

export const FloorStoryScene: React.FC<FloorStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #3b82f60f 0%, #60a5fa1a 100%)',
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
          floor(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #60a5fa60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#3b82f6',
            boxShadow: '0 4px 12px -2px #3b82f615',
          }}
        >
          floor(#NetH / 200)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #3b82f608 65%, #3b82f616 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#60a5fa" />
            <FloorMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#3b82f6"
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
              📖 业务故事：下地柜抽屉防顶爆安全算量
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              地柜净高 710mm，每个抽屉高 200mm。若向上取整做 4 个，第 4 个抽屉就会硬顶穿台面。小宇用向下取整稳妥定下 3 个抽屉，余量设计为散热透气缝。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#3b82f60d',
              borderLeft: '3px solid #3b82f6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            向下取整，在固定物理包络线内确保机械组件绝对无挤压与干涉。
          </div>
        </div>
      </div>
    </div>
  );
};
