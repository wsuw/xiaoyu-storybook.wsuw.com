import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface TrimAvgStorySceneProps {
  lockedW?: number;
}

const TrimAvgMesh: React.FC<TrimAvgStorySceneProps> = ({
  lockedW = 550,
}) => {

    const scaleLocked = lockedW / 400;
    const totalSpace = 2.4;
    const remainingW = (totalSpace - scaleLocked) / 3;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[-totalSpace / 2 + scaleLocked / 2, 0.2, 0]}>
          <boxGeometry args={[scaleLocked, 1.8, 0.8]} />
          <meshStandardMaterial color="#d946ef" metalness={0.4} />
        </mesh>
        {[0, 1, 2].map((idx) => {
          const posX = -totalSpace / 2 + scaleLocked + remainingW * (idx + 0.5);
          return (
            <mesh key={idx} position={[posX, 0.2, 0]}>
              <boxGeometry args={[remainingW * 0.92, 1.8, 0.8]} />
              <meshStandardMaterial color="#f0abfc" transparent opacity={0.6} wireframe />
            </mesh>
          );
        })}
      </group>
    );
};

export const TrimAvgStoryScene: React.FC<TrimAvgStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #d946ef0f 0%, #f0abfc1a 100%)',
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
          trimavg(#W, #W1, #W2, ...)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #f0abfc60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#d946ef',
            boxShadow: '0 4px 12px -2px #d946ef15',
          }}
        >
          trimavg(#TotalW, #W1, #W2, #W3)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #d946ef08 65%, #d946ef16 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#f0abfc" />
            <TrimAvgMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#d946ef"
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
              📖 业务故事：风衣专区锁定与剩余格子自适应
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              四门大衣柜中，客户强行锁定了左侧第一格 600mm 放长款大衣。小宇用 trimavg 自动剔除这个非公式的固定值，将剩余的总空间精准平分给剩下三格。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#d946ef0d',
              borderLeft: '3px solid #d946ef',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            智能过滤用户手动指定的常数项，仅对未锁定的自由变量执行空间再分配。
          </div>
        </div>
      </div>
    </div>
  );
};
