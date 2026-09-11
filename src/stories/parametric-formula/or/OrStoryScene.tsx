import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

export interface OrStorySceneProps {
  h?: number;
  w?: number;
}

const OrDoorStraightenerMesh: React.FC<OrStorySceneProps> = ({
  h = 2400,
  w = 500,
}) => {
  // 比例映射：将实际 mm 映射为 3D 场景尺寸
  const doorH = (h / 2000) * 2.2;
  const doorW = (w / 600) * 1.0;
  const doorThick = 0.04;

  // or 逻辑判定
  const isOverH = h > 2000;
  const isOverW = w > 600;
  const needStraightener = isOverH || isOverW;

  return (
    <group position={[0, -0.1, 0]}>
      {/* 门板主体（微侧向旋转，让正面与背面拉直器都能尽收眼底） */}
      <group rotation={[0, -0.65, 0]}>
        {/* 门板板件 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[doorW, doorH, doorThick]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* 正面精致极简金属拉手 */}
        <mesh position={[-doorW / 2 + 0.06, 0, doorThick / 2 + 0.015]}>
          <boxGeometry args={[0.015, Math.min(0.45, doorH * 0.3), 0.02]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* 背面金属防弯拉直器系统（重点视觉展示：嵌装在门板背面中央偏合页侧） */}
        {needStraightener && (
          <group position={[doorW * 0.15, 0, -doorThick / 2 - 0.01]}>
            {/* 拉直器铝合金开槽通长主体杆（金色高光） */}
            <mesh>
              <boxGeometry args={[0.035, doorH * 0.92, 0.02]} />
              <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.15} />
            </mesh>

            {/* 顶端调节螺栓座 */}
            <mesh position={[0, doorH * 0.46 - 0.02, 0.005]}>
              <cylinderGeometry args={[0.022, 0.022, 0.03, 16]} />
              <meshStandardMaterial color="#451a03" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* 底端调节螺栓座 */}
            <mesh position={[0, -doorH * 0.46 + 0.02, 0.005]}>
              <cylinderGeometry args={[0.022, 0.022, 0.03, 16]} />
              <meshStandardMaterial color="#451a03" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* 拉直器中段预应力锁扣 */}
            <mesh position={[0, 0, 0.008]}>
              <boxGeometry args={[0.045, 0.06, 0.015]} />
              <meshStandardMaterial color="#78350f" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};

export const OrStoryScene: React.FC<OrStorySceneProps> = (props) => {
  const currentH = props.h ?? 2400;
  const currentW = props.w ?? 500;

  const isOverH = currentH > 2000;
  const isOverW = currentW > 600;
  const needStraightener = isOverH || isOverW;

  let reasonText = '';
  if (isOverH && isOverW) {
    reasonText = '高度超标 (>2000) 且 宽度超标 (>600) → 触发安装';
  } else if (isOverH) {
    reasonText = '高度超标 (>2000mm) 单项超标即触发 → 触发安装';
  } else if (isOverW) {
    reasonText = '宽度超标 (>600mm) 单项超标即触发 → 触发安装';
  } else {
    reasonText = '两项均在安全线内 → 保持常规无拉直器';
  }

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
          {"if(#H > 2000 or #W > 600, 1, 0)"}
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
          <Canvas camera={{ position: [0, 0.2, 3.8], fov: 42 }} gl={{ antialias: true }}>
            <color attach="background" args={['#fafafa']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
            <directionalLight position={[-5, 4, -4]} intensity={0.6} />
            <pointLight position={[0, 1, -2]} intensity={0.8} color="#f59e0b" />
            <OrDoorStraightenerMesh {...props} />
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.35}
              scale={6}
              blur={2}
              far={3}
              color="#ea580c"
            />
            <OrbitControls target={[0, 0, 0]} enableZoom={true} maxPolarAngle={Math.PI / 2 + 0.05} />
          </Canvas>

          {/* 实时状态浮窗 */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #e2e8f0',
              padding: '12px 18px',
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              fontSize: '13px',
              color: '#334155',
            }}
          >
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              门板高度：<span style={{ color: '#ea580c' }}>{currentH} mm</span> ｜ 门板宽度：<span style={{ color: '#ea580c' }}>{currentW} mm</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>金属拉直器：</span>
              <span
                style={{
                  fontWeight: 700,
                  color: needStraightener ? '#d97706' : '#64748b',
                  background: needStraightener ? '#fef3c7' : '#f1f5f9',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {needStraightener ? '⚡ 强制内嵌 1 根通长拉直器' : '✕ 无需加装'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              判定结果：{reasonText}
            </div>
          </div>

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
            ✦ 3D 视口：按住鼠标左键旋转观察门背 · 右键平移 · 滚轮缩放
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
              📖 业务故事：超高或超宽门板防弯拉直器自动加装
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#475569',
              }}
            >
              门板一旦高度超过 2000mm（一门到顶）容易受四季温湿应力弓背拱起；或者宽度超过 600mm 容易受横向重力力矩扭曲。小宇运用 <code>or</code> 规则：只要任一参数越界，门板背面立即自动嵌装一整根醒目的金色防弯拉直器！
            </p>
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
            “or 逻辑”是工业生产中最典型的安全红线双保险。任一维度超标立刻触发硬件防护，既保证方案颜值，又杜绝了售后弯门变形维权风险。
          </div>
        </div>
      </div>
    </div>
  );
};
