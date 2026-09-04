import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface EqNeqStorySceneProps {
  doorType?: number;
}

const EqNeqMesh: React.FC<EqNeqStorySceneProps> = ({
  doorType = 1,
}) => {

    const isGlass = doorType === 1;
    return (
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, 0.2, -0.3]}>
          <boxGeometry args={[1.6, 2.0, 0.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.2, 0.02]}>
          <boxGeometry args={[1.56, 1.96, 0.04]} />
          <meshStandardMaterial
            color={isGlass ? '#ec4899' : '#d97706'}
            transparent
            opacity={isGlass ? 0.35 : 0.95}
            roughness={isGlass ? 0.05 : 0.7}
            metalness={isGlass ? 0.9 : 0.1}
          />
        </mesh>
        {isGlass && (
          <mesh position={[0, 0.2, 0.04]}>
            <boxGeometry args={[1.58, 1.98, 0.02]} />
            <meshStandardMaterial color="#f472b6" wireframe />
          </mesh>
        )}
      </group>
    );
};

export const EqNeqStoryScene: React.FC<EqNeqStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #ec48990f 0%, #f472b61a 100%)',
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
          == (等于) / != (不等于)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f472b660',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ec4899',
            boxShadow: '0 4px 12px -2px #ec489915',
          }}
        >
          #DoorType == 1
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #ec489908 65%, #ec489916 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#f472b6" />
            <EqNeqMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#ec4899"
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
              📖 业务故事：玻璃高显门与免拉手打孔
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              当柜门类型等于 1 时，实木门瞬间变为通透的高显铝框玻璃门，背板开启氛围灯带；当不等于 0 时，拉手打孔槽位精准联动呈现。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#ec48990d',
              borderLeft: '3px solid #ec4899',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            通过枚举判断切换模型材质网格、显示槽位与五金孔位预留。
          </div>
        </div>
      </div>
    </div>
  );
};
