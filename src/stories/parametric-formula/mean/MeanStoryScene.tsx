import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface MeanStorySceneProps {
  yDiff?: number;
}

const MeanMesh: React.FC<MeanStorySceneProps> = ({
  yDiff = 80,
}) => {

    const diff = yDiff / 100;
    const y1 = -0.4 - diff * 0.4;
    const y2 = 0.1 + diff * 0.2;
    const y3 = 0.6 + diff * 0.5;
    const avg = (y1 + y2 + y3) / 3;
    return (
      <group position={[0, -0.1, 0]}>
        {[y1, y2, y3].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial color="#8b5cf6" metalness={0.3} />
          </mesh>
        ))}
        <mesh position={[0, avg, 0]}>
          <boxGeometry args={[1.7, 0.02, 0.85]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
      </group>
    );
};

export const MeanStoryScene: React.FC<MeanStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #8b5cf60f 0%, #c4b5fd1a 100%)',
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
          mean([x1, x2, ...])
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #c4b5fd60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#8b5cf6',
            boxShadow: '0 4px 12px -2px #8b5cf615',
          }}
        >
          mean([#Y1, #Y2, #Y3])
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #8b5cf608 65%, #8b5cf616 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#c4b5fd" />
            <MeanMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#8b5cf6"
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
              📖 业务故事：参差层板一键回归黄金重心
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              客户随意拖动调整了书柜三块活动层板，高度错乱无章。小宇点击一键居中，mean 函数瞬间计算出三块板材的平均质心位置，令书架恢复对称与典雅。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#8b5cf60d',
              borderLeft: '3px solid #8b5cf6',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            快速计算多个构件或参考基准面的算术重心，实现智能排版与视觉平衡。
          </div>
        </div>
      </div>
    </div>
  );
};
