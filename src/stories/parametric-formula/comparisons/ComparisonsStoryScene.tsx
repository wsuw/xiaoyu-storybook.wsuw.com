import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface ComparisonsStorySceneProps {
  w?: number;
}

const ComparisonsMesh: React.FC<ComparisonsStorySceneProps> = ({
  w = 500,
}) => {

    const fillerW = w <= 550 ? 0.08 : 0.22;
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[-0.2, 0.2, 0]}>
          <boxGeometry args={[1.4, 1.7, 1.0]} />
          <meshStandardMaterial color="#64748b" metalness={0.2} />
        </mesh>
        <mesh position={[0.5 + fillerW / 2, 0.2, 0]}>
          <boxGeometry args={[fillerW, 1.7, 1.0]} />
          <meshStandardMaterial color="#475569" metalness={0.6} />
        </mesh>
        <mesh position={[0.5 + fillerW + 0.15, 0.2, 0]}>
          <boxGeometry args={[0.2, 2.2, 1.4]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>
    );
};

export const ComparisonsStoryScene: React.FC<ComparisonsStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #64748b0f 0%, #94a3b81a 100%)',
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
          {"比较运算符 (<, >, <=, >=)"}
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #94a3b860',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#64748b',
            boxShadow: '0 4px 12px -2px #64748b15',
          }}
        >
          {"if(#W <= 550, 15, 30)"}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #64748b08 65%, #64748b16 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#94a3b8" />
            <ComparisonsMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#64748b"
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
              📖 业务故事：卫生间马桶侧边填缝条自适应
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              卫生间紧邻马桶的小浴室柜，宽度小于等于 550mm 时只能容纳 15mm 极窄防霉封边条；大于 550mm 时则预留 30mm 标准检修填缝口。
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#64748b0d',
              borderLeft: '3px solid #64748b',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            对空间尺寸建立硬性上下限，确保家具不仅美观，更能实际运抵现场并顺利安装。
          </div>
        </div>
      </div>
    </div>
  );
};
