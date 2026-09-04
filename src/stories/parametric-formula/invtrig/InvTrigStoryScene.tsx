import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface InvTrigStorySceneProps {
  liftH?: number;
}

const InvTrigMesh: React.FC<InvTrigStorySceneProps> = ({
  liftH = 240,
}) => {

    const liftNorm = liftH / 400;
    const angle = Math.asin(Math.min(0.95, liftNorm));
    return (
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, 0.4, -0.4]}>
          <boxGeometry args={[1.8, 1.2, 0.8]} />
          <meshStandardMaterial color="#e2e8f0" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 1.0, 0]} rotation={[-angle, 0, 0]}>
          <boxGeometry args={[1.76, 1.16, 0.04]} />
          <meshStandardMaterial color="#eab308" metalness={0.3} roughness={0.3} />
        </mesh>
        <mesh position={[0.7, 0.5, 0]} rotation={[angle * 1.2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 16]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.8} />
        </mesh>
      </group>
    );
};

export const InvTrigStoryScene: React.FC<InvTrigStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #eab3080f 0%, #fde0471a 100%)',
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
          asin / acos / atan (反三角函数)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fde04760',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#eab308',
            boxShadow: '0 4px 12px -2px #eab30815',
          }}
        >
          θ = asin(#LiftH / #ArmLength)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #eab30808 65%, #eab30816 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#fde047" />
            <InvTrigMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#eab308"
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
              📖 业务故事：气撑上翻吊柜机械连杆逆向解算
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              设计师只想输入吊柜门抬高了 300mm，底层的机械支撑臂到底应该旋转多少度？小宇运用反正弦与反正切逆向反推，算出了支撑杆轴心的微弧度偏转。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#eab3080d',
              borderLeft: '3px solid #eab308',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            在已知抬升位移或空间点坐标时，反向求解旋转关节的角度，实现高级五金机构的联动。
          </div>
        </div>
      </div>
    </div>
  );
};
