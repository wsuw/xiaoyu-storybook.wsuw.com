import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface AllInStorySceneProps {
  selectedMask?: number;
}

const AllInMesh: React.FC<AllInStorySceneProps> = ({
  selectedMask = 7,
}) => {

    const isAllIn = selectedMask === 7;
    const hasSteam = Boolean(selectedMask & 1);
    const hasOven = Boolean(selectedMask & 2);
    const hasDishwasher = Boolean(selectedMask & 4);
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.7, 0.08, 1.2]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.1} metalness={0.2} />
        </mesh>
        <group position={[-0.85, 0.05, 0]}>
          <mesh>
            <boxGeometry args={[0.75, 1.3, 1.05]} />
            <meshStandardMaterial color={hasSteam ? '#0284c7' : '#f8fafc'} metalness={hasSteam ? 0.7 : 0.1} />
          </mesh>
          {hasSteam && (
            <mesh position={[0, 0, 0.54]}>
              <boxGeometry args={[0.65, 0.4, 0.02]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.1} />
            </mesh>
          )}
        </group>
        <group position={[0, 0.05, 0]}>
          <mesh>
            <boxGeometry args={[0.75, 1.3, 1.05]} />
            <meshStandardMaterial color={hasOven ? '#0369a1' : '#f8fafc'} metalness={hasOven ? 0.7 : 0.1} />
          </mesh>
          {hasOven && (
            <mesh position={[0, 0, 0.54]}>
              <boxGeometry args={[0.65, 0.5, 0.02]} />
              <meshStandardMaterial color="#0ea5e9" roughness={0.1} />
            </mesh>
          )}
        </group>
        <group position={[0.85, 0.05, 0]}>
          <mesh>
            <boxGeometry args={[0.75, 1.3, 1.05]} />
            <meshStandardMaterial color={hasDishwasher ? '#075985' : '#f8fafc'} metalness={hasDishwasher ? 0.7 : 0.1} />
          </mesh>
          {hasDishwasher && (
            <mesh position={[0, 0, 0.54]}>
              <boxGeometry args={[0.65, 0.9, 0.02]} />
              <meshStandardMaterial color="#7dd3fc" roughness={0.1} />
            </mesh>
          )}
        </group>
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[2.65, isAllIn ? 0.22 : 0.06, 1.08]} />
          <meshStandardMaterial
            color={isAllIn ? '#0284c7' : '#94a3b8'}
            metalness={isAllIn ? 0.9 : 0.2}
            roughness={0.2}
          />
        </mesh>
        {[-1.15, 1.15].map((x, i) =>
          [-0.45, 0.45].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, -0.9, z]}>
              <cylinderGeometry args={[0.04, 0.06, 0.2, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
          ))
        )}
      </group>
    );
};

export const AllInStoryScene: React.FC<AllInStorySceneProps> = (props) => {
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

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #0284c708 65%, #0284c716 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#38bdf8" />
            <AllInMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#0284c7"
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
              📖 业务故事：高端厨电三件套与重载底座
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              橱柜提供蒸箱(0)、烤箱(1)、洗碗机(2)等设备选配。当客户将核心三大件全部齐集选中时，地柜底部立刻触发双倍加固的高承重金属底梁。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#0284c70d',
              borderLeft: '3px solid #0284c7',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            校验多元件集合依赖关系，一旦满足全部必备配置，立刻激活关联的加固构件或强化工艺。
          </div>
        </div>
      </div>
    </div>
  );
};
