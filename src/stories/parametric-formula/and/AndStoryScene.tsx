import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface AndStorySceneProps {
  w?: number;
  d?: number;
}

const AndMesh: React.FC<AndStorySceneProps> = ({
  w = 680,
  d = 420,
}) => {

    const scaleW = w / 350;
    const scaleD = d / 300;
    const isRisk = w > 600 && d > 380;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[scaleW, 2.0, scaleD]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        {[-0.65, 0.65, 1.25].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <boxGeometry args={[scaleW * 0.98, 0.06, scaleD * 0.95]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.3} />
          </mesh>
        ))}
        {isRisk && (
          <group position={[0, 0.3, 0]}>
            <mesh>
              <boxGeometry args={[0.06, 1.8, scaleD * 0.92]} />
              <meshStandardMaterial color="#d97706" metalness={0.6} roughness={0.2} />
            </mesh>
            {[-0.5, 0.5].map((y, i) => (
              <mesh key={i} position={[0.05, y, 0]}>
                <boxGeometry args={[0.04, 0.04, 0.08]} />
                <meshStandardMaterial color="#78350f" metalness={0.9} />
              </mesh>
            ))}
          </group>
        )}
      </group>
    );
};

export const AndStoryScene: React.FC<AndStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #f59e0b0f 0%, #fbbf241a 100%)',
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
          条件1 and 条件2
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fbbf2460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f59e0b',
            boxShadow: '0 4px 12px -2px #f59e0b15',
          }}
        >
          {"#W > 600 and #D > 380"}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f59e0b08 65%, #f59e0b16 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#fbbf24" />
            <AndMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#f59e0b"
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
              📖 业务故事：大跨度超深书架与中央防弯立柱
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              客户要一个巨型书架。若柜宽超过 600mm 且层板进深也超过 380mm，层板在长期重压下有断裂风险。小宇设置双条件满足时，中央防弯竖板立即出现。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#f59e0b0d',
              borderLeft: '3px solid #f59e0b',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            只有在多项结构风险同时存在时才介入加固构件，兼顾空间通透与力学安全。
          </div>
        </div>
      </div>
    </div>
  );
};
