import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface CeilStorySceneProps {
  h?: number;
}

const CeilMesh: React.FC<CeilStorySceneProps> = ({
  h = 2200,
}) => {

    const count = Math.ceil(h / 400);
    const scaleH = h / 1000;
    const step = scaleH / count;
    const shelfThick = 0.05;
    // 侧板总高度：层板最低处在 0.3 - scaleH / 2 - shelfThick / 2，最高处在 0.3 + scaleH / 2 + shelfThick / 2
    // 侧板高度设为 scaleH + shelfThick，完全包裹/覆盖上下层板
    const sideH = scaleH + shelfThick;
    return (
      <group position={[0, -0.3, 0]}>
        <mesh position={[-0.8, 0.3, 0]}>
          <boxGeometry args={[0.06, sideH, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.8, 0.3, 0]}>
          <boxGeometry args={[0.06, sideH, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
        </mesh>
        {Array.from({ length: count + 1 }).map((_, i) => (
          <mesh key={i} position={[0, 0.3 - scaleH / 2 + i * step, 0]}>
            <boxGeometry args={[1.54, shelfThick, 0.78]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.3} roughness={0.3} />
          </mesh>
        ))}
      </group>
    );
};

export const CeilStoryScene: React.FC<CeilStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #06b6d40f 0%, #67e8f91a 100%)',
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
          ceil(#A)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #67e8f960',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#06b6d4',
            boxShadow: '0 4px 12px -2px #06b6d415',
          }}
        >
          ceil(#H / 400)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: '100%',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #06b6d408 65%, #06b6d416 100%)',
          }}
        >
          <Canvas camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 10, 6]} intensity={1.3} castShadow />
            <directionalLight position={[-6, -4, -6]} intensity={0.3} />
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#67e8f9" />
            <CeilMesh {...props} />
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.35}
              scale={7}
              blur={2}
              far={3}
              color="#06b6d4"
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
              📖 业务故事：展示货架绝不悬空的隔板计算
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              高 2300mm 的陈列架，按 400mm 一档算出来是 5.75 层。如果少做一层，顶头就会留下一大截丑陋的空档。小宇用向上取整，坚决生成 6 层隔板！
            </p
            >
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#334155',
              background: '#06b6d40d',
              borderLeft: '3px solid #06b6d4',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <strong>💡 联动价值：</strong>
            向上补齐，宁可多算一组构件与五金，也绝不让结构出现跨度不足或布局脱节。
          </div>
        </div>
      </div>
    </div>
  );
};
