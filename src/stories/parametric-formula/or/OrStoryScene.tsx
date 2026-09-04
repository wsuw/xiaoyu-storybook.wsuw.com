import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface OrStorySceneProps {
  h?: number;
}

const OrMesh: React.FC<OrStorySceneProps> = ({
  h = 2500,
}) => {

    const scaleH = h / 1000;
    const isThick = h > 2400;
    const thickness = isThick ? 0.18 : 0.08;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[-0.85, 0.2, 0]}>
          <boxGeometry args={[thickness, scaleH, 1.1]} />
          <meshStandardMaterial color={isThick ? '#ea580c' : '#94a3b8'} metalness={0.3} />
        </mesh>
        <mesh position={[0.85, 0.2, 0]}>
          <boxGeometry args={[thickness, scaleH, 1.1]} />
          <meshStandardMaterial color={isThick ? '#ea580c' : '#94a3b8'} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.2 + scaleH / 2, 0]}>
          <boxGeometry args={[1.7 + thickness, 0.06, 1.1]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>
    );
};

export const OrStoryScene: React.FC<OrStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #ea580c0f 0%, #fb923c1a 100%)',
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
          条件1 or 条件2
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fb923c60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#ea580c',
            boxShadow: '0 4px 12px -2px #ea580c15',
          }}
        >
          {"if(#H > 2400 or #W > 800, 25, 18)"}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #ea580c08 65%, #ea580c16 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#fb923c" />
            <OrMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#ea580c"
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
              📖 业务故事：超高或超宽的侧板厚度升级
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              一门到顶的柜子，高度超过 2400mm 会发生微弯；宽度超过 800mm 则侧向应力激增。只要满足任意一条，小宇就自动将侧板从 18mm 升级为 25mm 稳固板。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#ea580c0d',
              borderLeft: '3px solid #ea580c',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            设置多重安全阈值。任意单一指标超标即可触发防护机制，防止设计出缺陷产品。
          </div>
        </div>
      </div>
    </div>
  );
};
