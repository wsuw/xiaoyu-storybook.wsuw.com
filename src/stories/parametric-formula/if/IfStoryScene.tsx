import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface IfStorySceneProps {
  w?: number;
}

const IfMesh: React.FC<IfStorySceneProps> = ({
  w = 460,
}) => {

    const scaleW = w / 400;
    const drawerDepth = w < 500 ? 350 / 300 : 450 / 300;
    const isNarrow = w < 500;
    return (
      <group position={[0, -0.3, 0]}>
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[scaleW + 0.1, 0.06, 1.3]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>
        <mesh position={[-scaleW / 2, 0.2, 0]}>
          <boxGeometry args={[0.04, 2.0, 1.2]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} />
        </mesh>
        <mesh position={[scaleW / 2, 0.2, 0]}>
          <boxGeometry args={[0.04, 2.0, 1.2]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.2, -0.58]}>
          <boxGeometry args={[scaleW, 2.0, 0.02]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.02, 0.02, scaleW * 0.95, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        </mesh>
        <group position={[0, -0.45, (drawerDepth * 0.5) - 0.45]}>
          <mesh>
            <boxGeometry args={[scaleW * 0.92, 0.5, drawerDepth]} />
            <meshStandardMaterial
              color={isNarrow ? '#6366f1' : '#4338ca'}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, drawerDepth / 2 + 0.03]}>
            <boxGeometry args={[0.16, 0.02, 0.03]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        <mesh position={[0, -0.78, 0]}>
          <boxGeometry args={[scaleW, 0.12, 1.15]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>
    );
};

export const IfStoryScene: React.FC<IfStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #6366f10f 0%, #818cf81a 100%)',
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
          if(条件, 值1, 值2)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #818cf860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#6366f1',
            boxShadow: '0 4px 12px -2px #6366f115',
          }}
        >
          {"if(#W < 500, 350, 450)"}
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
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#818cf8" />
            <IfMesh {...props} />
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
              📖 业务故事：窄道玄关柜与抽屉避让
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              客户家玄关空间狭长。小宇设定：当柜体宽度 #W 小于 500mm 时，抽屉深度自动收缩为 350mm 灵巧避门；一旦扩宽至 500mm 以上，深抽屉立即延展到 450mm 扩容大收纳。
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
            通过条件判断，使同一套柜体模型在不同空间尺寸下自动切换组件规格，免去人工重做模型的繁琐。
          </div>
        </div>
      </div>
    </div>
  );
};
