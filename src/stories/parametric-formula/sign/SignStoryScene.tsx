import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface SignStorySceneProps {
  moveOffset?: number;
}

const SignMesh: React.FC<SignStorySceneProps> = ({
  moveOffset = -60,
}) => {

    const signVal = Math.sign(moveOffset);
    const posX = (moveOffset / 100) * 0.8;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.5, 0.06, 0.15]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh position={[posX, 0, 0]}>
          <boxGeometry args={[0.85, 1.5, 0.06]} />
          <meshStandardMaterial color="#6366f1" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[posX - signVal * 0.6, 0.8, 0]} rotation={[0, 0, signVal > 0 ? Math.PI : 0]}>
          <coneGeometry args={[0.12, 0.35, 16]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      </group>
    );
};

export const SignStoryScene: React.FC<SignStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #6366f10f 0%, #a5b4fc1a 100%)',
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
          sign(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a5b4fc60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#6366f1',
            boxShadow: '0 4px 12px -2px #6366f115',
          }}
        >
          sign(#MoveOffset)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #6366f108 65%, #6366f116 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#a5b4fc" />
            <SignMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#6366f1"
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
              📖 业务故事：双向移门阻尼缓冲器的逆向弹力
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              衣柜移门向左推偏移为负，向右推为正。小宇利用 sign 函数提取出纯粹的 +1 / -1 动量方向，使防撞阻尼器无论门往哪边滑动，都能迎面释放缓冲阻力。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#6366f10d',
              borderLeft: '3px solid #6366f1',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            无视位移大小，瞬间解析出物体的朝向与运动趋势，专门用于机械反作用力与方向指示。
          </div>
        </div>
      </div>
    </div>
  );
};
