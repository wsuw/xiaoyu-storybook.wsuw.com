import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface SqrtStorySceneProps {
  w?: number;
  h?: number;
}

const SqrtMesh: React.FC<SqrtStorySceneProps> = ({
  w = 700,
  h = 600,
}) => {

    const scaleW = w / 350;
    const scaleH = h / 350;
    const diag = Math.sqrt(scaleW * scaleW + scaleH * scaleH);
    const diagAngle = Math.atan2(scaleH, scaleW);
    return (
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[scaleW, scaleH, 0.08]} />
          <meshStandardMaterial color="#cbd5e1" wireframe />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, diagAngle]}>
          <cylinderGeometry args={[0.025, 0.025, diag, 16]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -diagAngle]}>
          <cylinderGeometry args={[0.025, 0.025, diag, 16]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} />
        </mesh>
      </group>
    );
};

export const SqrtStoryScene: React.FC<SqrtStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #10b9810f 0%, #6ee7b71a 100%)',
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
          sqrt(x)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #6ee7b760',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#10b981',
            boxShadow: '0 4px 12px -2px #10b98115',
          }}
        >
          sqrt(#W*#W + #H*#H)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #10b98108 65%, #10b98116 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#6ee7b7" />
            <SqrtMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#10b981"
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
              📖 业务故事：工业风金属背架对角防晃拉杆
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              工业风格书架后方需要两根交叉的 X 形不锈钢防晃拉杆。不论柜子被用户拉伸得更宽还是更高，勾股定理开方函数确保拉杆长度每一分都不差。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#10b9810d',
              borderLeft: '3px solid #10b981',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            计算欧氏对角线距离与三维模长，使对角线支撑件和空间连接杆能够自适应伸缩下料。
          </div>
        </div>
      </div>
    </div>
  );
};
