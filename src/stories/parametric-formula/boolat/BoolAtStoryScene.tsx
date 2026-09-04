import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface BoolAtStorySceneProps {
  packageId?: number;
}

const BoolAtMesh: React.FC<BoolAtStorySceneProps> = ({
  packageId = 3,
}) => {

    const isExact = packageId === 3;
    return (
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.8, 1.8, 1.0]} />
          <meshStandardMaterial color="#0d9488" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0.51]}>
          <boxGeometry args={[0.01, 1.76, 0.02]} />
          <meshStandardMaterial color="#042f2e" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.82, 1.82, 1.02]} />
          <meshStandardMaterial
            color={isExact ? '#14b8a6' : '#cbd5e1'}
            metalness={isExact ? 0.9 : 0.1}
            wireframe={true}
          />
        </mesh>
      </group>
    );
};

export const BoolAtStoryScene: React.FC<BoolAtStorySceneProps> = (props) => {
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

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #0d948808 65%, #0d948816 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#2dd4bf" />
            <BoolAtMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#0d9488"
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
              📖 业务故事：初春限定尊享套餐与一体封边
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              定制品牌推出了“初春极简三件套”。小宇规定：只有当勾选的模块不多不少严格为地柜、吊柜和免拉手灯条时，才启用专属一体化激光无缝封边。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#0d94880d',
              borderLeft: '3px solid #0d9488',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            严格判定两组选项完全相等，用于限定款、套餐包与专属特定工艺的绝对匹配。
          </div>
        </div>
      </div>
    </div>
  );
};
