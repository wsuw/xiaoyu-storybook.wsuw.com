import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface NestedIfStorySceneProps {
  d?: number;
}

const NestedIfMesh: React.FC<NestedIfStorySceneProps> = ({
  d = 340,
}) => {

    const depth = d / 300;
    let bracketLen = 250 / 300;
    let tierColor = '#a78bfa';
    if (d <= 350) {
      bracketLen = 250 / 300;
      tierColor = '#a78bfa';
    } else if (d <= 400) {
      bracketLen = 300 / 300;
      tierColor = '#8b5cf6';
    } else {
      bracketLen = 350 / 300;
      tierColor = '#6d28d9';
    }
    return (
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 0.4, -depth / 2]}>
          <boxGeometry args={[2.0, 1.8, 0.05]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.9, 1.7, depth]} />
          <meshStandardMaterial color="#cbd5e1" wireframe transparent opacity={0.35} />
        </mesh>
        {[-0.8, 0.8].map((x, idx) => (
          <group key={idx} position={[x, 0.4, -depth / 2 + bracketLen / 2]}>
            <mesh>
              <boxGeometry args={[0.05, 0.08, bracketLen]} />
              <meshStandardMaterial color={tierColor} metalness={0.8} roughness={0.15} />
            </mesh>
            <mesh position={[0, 0.08, bracketLen / 2 - 0.05]}>
              <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.48, -depth / 2 + bracketLen - 0.05]}>
          <cylinderGeometry args={[0.03, 0.03, 1.65, 32]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    );
};

export const NestedIfStoryScene: React.FC<NestedIfStorySceneProps> = (props) => {
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
          background: 'linear-gradient(135deg, #8b5cf60f 0%, #a78bfa1a 100%)',
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
          nestedif(...)
        </h2>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #a78bfa60',
            padding: '8px 18px',
            borderRadius: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: 700,
            color: '#8b5cf6',
            boxShadow: '0 4px 12px -2px #8b5cf615',
          }}
        >
          {"nestedif(#D<=350, 250, #D<=400, 300, 350)"}
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
            <pointLight position={[0, 3, 2]} intensity={0.8} color="#a78bfa" />
            <NestedIfMesh {...props} />
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
              📖 业务故事：铰链阻尼三档无缝适配
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              柜深 #D 从薄玄关柜、中进深书架到深衣柜连续变化。小宇设立三档托架梯级：深 ≤350mm 配 250 托架，≤400mm 配 300 托架，更深则配 350 工业级标准托架。
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
            无需层层嵌套 if 括号，直观声明阶梯式工艺档位，让五金选配与柜体深度严密对应。
          </div>
        </div>
      </div>
    </div>
  );
};
