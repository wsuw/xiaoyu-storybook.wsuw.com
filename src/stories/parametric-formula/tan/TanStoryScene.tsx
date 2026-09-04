import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface TanStorySceneProps {
  roofAngle?: number;
}

const TanMesh: React.FC<TanStorySceneProps> = ({
  roofAngle = 28,
}) => {

    const angleRad = (roofAngle * Math.PI) / 180;
    const tanSlope = Math.tan(angleRad);
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, -angleRad]}>
          <boxGeometry args={[2.5, 0.05, 1.2]} />
          <meshStandardMaterial color="#f97316" transparent opacity={0.6} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((x, idx) => {
          const deltaH = (x + 0.8) * tanSlope;
          const h = Math.max(0.4, 1.6 - deltaH);
          return (
            <mesh key={idx} position={[x, -0.7 + h / 2, 0]}>
              <boxGeometry args={[0.08, h, 0.9]} />
              <meshStandardMaterial color="#c2410c" metalness={0.3} />
            </mesh>
          );
        })}
      </group>
    );
};

export const TanStoryScene: React.FC<TanStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #f973160f 0%, #fdba741a 100%)',
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
          tan(θ)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fdba7460',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#f97316',
            boxShadow: '0 4px 12px -2px #f9731615',
          }}
        >
          ΔH = #Depth * tan(#RoofAngle)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f9731608 65%, #f9731616 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#fdba74" />
            <TanMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#f97316"
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
              📖 业务故事：斜顶阁楼衣柜的严丝合缝贴角
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              阁楼天花板有着 25° 的倾角。每一块竖向柜侧板随着进深后退，顶部都必须切掉一段高度。小宇利用正切比率，自动计算每一块板的削角下刀斜度。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#f973160d',
              borderLeft: '3px solid #f97316',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            通过斜率正切比率，把平面倾角投射为垂直高度差，实现异形倾斜空间的精准裁切。
          </div>
        </div>
      </div>
    </div>
  );
};
